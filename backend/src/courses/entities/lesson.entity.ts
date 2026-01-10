
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 500 })
  videoUrl: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 20 })
  duration: string;

  @Column({ type: 'int' })
  order: number;

  @Column()
  courseId: string;

  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
