import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('reading_progress')
export class ReadingProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  book_id: string;

  @Column({ type: 'int' })
  current_page: number;

  @Column({ type: 'float' })
  percentage_read: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
    