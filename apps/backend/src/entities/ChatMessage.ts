import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Project } from './Project';

@Entity()
export class ChatMessage {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Project)
  project!: Project;

  @Property()
  role!: string;

  @Property()
  content!: string;

  @Property()
  timestamp: Date = new Date();
}
