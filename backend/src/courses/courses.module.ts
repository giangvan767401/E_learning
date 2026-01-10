
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson, Enrollment])],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}
