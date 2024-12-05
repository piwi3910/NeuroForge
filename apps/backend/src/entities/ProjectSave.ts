import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Project } from './Project';

@Entity()
export class ProjectSave {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Project)
  project!: Project;

  @Property()
  name!: string;

  @Property({ type: 'json' })
  data!: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}
