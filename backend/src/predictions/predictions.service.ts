
import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { spawn } from 'child_process';
import { PredictionResult } from './entities/prediction-result.entity';
import { LearningLog } from '../logs/entities/learning-log.entity';
import { UploadedModel } from '../models/entities/uploaded-model.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(PredictionResult)
    private resultRepository: Repository<PredictionResult>,
    @InjectRepository(LearningLog)
    private logRepository: Repository<LearningLog>,
    @InjectRepository(UploadedModel)
    private modelRepository: Repository<UploadedModel>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async runInference(courseId: string, studentId: string, instructorId: string): Promise<any> {
    // 1. Validate Course and Active Model
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');
    if (!course.activeModelId) throw new NotFoundException('No active model deployed for this course');

    const model = await this.modelRepository.findOne({ where: { id: course.activeModelId } });
    if (!model) throw new NotFoundException('Active model file not found in registry');

    // 2. Fetch Recent Telemetry Logs
    const logs = await this.logRepository.find({
      where: { studentId, moduleId: `MOD-${courseId}` }, // Assuming module mapping
      order: { timestamp: 'DESC' },
      take: 20
    });

    if (logs.length === 0) {
      throw new NotFoundException('Insufficient telemetry data to run prediction');
    }

    // 3. Spawn Python Child Process
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', [
        'src/predictions/scripts/inference.py',
        '--model_path', model.filePath,
        '--logs', JSON.stringify(logs)
      ]);

      let resultData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      pythonProcess.on('close', async (code) => {
        if (code !== 0) {
          reject(new InternalServerErrorException(`ML Inference failed: ${errorData}`));
          return;
        }

        try {
          const parsed = JSON.parse(resultData);
          if (parsed.error) throw new Error(parsed.error);

          // 4. Save Prediction Result
          const prediction = this.resultRepository.create({
            studentId,
            courseId,
            modelId: model.id,
            failureRisk: parsed.failureRisk,
            confidence: parsed.confidence,
            rawOutput: parsed.details
          });

          const savedResult = await this.resultRepository.save(prediction);
          resolve(savedResult);
        } catch (e) {
          reject(new InternalServerErrorException('Failed to parse ML output'));
        }
      });
    });
  }

  async findByStudent(studentId: string) {
    return this.resultRepository.find({
      where: { studentId },
      order: { predictedAt: 'DESC' },
      relations: ['course']
    });
  }
}
