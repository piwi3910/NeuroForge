import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { ChatMessage } from './ChatMessage';
import { ProjectSave } from './ProjectSave';

@Entity()
export class Project {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  path!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true, fieldName: 'git_repo' })
  gitRepo?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany(() => ChatMessage, message => message.project)
  messages = new Collection<ChatMessage>(this);

  @OneToMany(() => ProjectSave, save => save.project)
  saves = new Collection<ProjectSave>(this);
}
