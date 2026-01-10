
import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Enrollment } from './entities/enrollment.entity';
import { CreateCourseDto, UpdateCourseDto } from '../shared/dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async findAll(query: any) {
    const { category, level, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (level) where.level = level;

    const [items, total] = await this.courseRepository.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['instructor'],
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['lessons', 'instructor'],
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(dto: CreateCourseDto, instructorId: string) {
    const { lessons, ...courseData } = dto;
    const course = this.courseRepository.create({
      ...courseData,
      instructorId,
    });

    const savedCourse = await this.courseRepository.save(course);

    if (lessons && lessons.length > 0) {
      const lessonEntities = lessons.map((l) =>
        this.lessonRepository.create({ ...l, courseId: savedCourse.id }),
      );
      await this.lessonRepository.save(lessonEntities);
    }

    return this.findOne(savedCourse.id);
  }

  async update(id: string, dto: UpdateCourseDto, instructorId: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You do not own this course');
    }

    Object.assign(course, dto);
    await this.courseRepository.save(course);
    return this.findOne(id);
  }

  async delete(id: string, instructorId: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You do not own this course');
    }

    await this.courseRepository.remove(course);
    return { success: true };
  }

  async enroll(courseId: string, userId: string) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const existing = await this.enrollmentRepository.findOne({
      where: { userId, courseId },
    });
    if (existing) throw new ConflictException('Already enrolled in this course');

    const enrollment = this.enrollmentRepository.create({ userId, courseId });
    return this.enrollmentRepository.save(enrollment);
  }

  async findMyEnrolled(userId: string) {
    const enrollments = await this.enrollmentRepository.find({
      where: { userId },
      relations: ['course', 'course.instructor'],
    });
    return enrollments.map((e) => e.course);
  }
}
