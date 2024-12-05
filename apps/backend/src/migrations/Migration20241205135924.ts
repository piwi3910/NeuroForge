import { Migration } from '@mikro-orm/migrations';

export class Migration20241205135924 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`project\` (\`id\` text not null, \`name\` text not null, \`path\` text not null, \`description\` text null, \`git_repo\` text null, \`created_at\` datetime not null, \`updated_at\` datetime not null, primary key (\`id\`));`);

    this.addSql(`create table \`chat_message\` (\`id\` integer not null primary key autoincrement, \`project_id\` text not null, \`role\` text not null, \`content\` text not null, \`timestamp\` datetime not null, constraint \`chat_message_project_id_foreign\` foreign key(\`project_id\`) references \`project\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`chat_message_project_id_index\` on \`chat_message\` (\`project_id\`);`);

    this.addSql(`create table \`project_save\` (\`id\` integer not null primary key autoincrement, \`project_id\` text not null, \`name\` text not null, \`data\` json not null, \`created_at\` datetime not null, constraint \`project_save_project_id_foreign\` foreign key(\`project_id\`) references \`project\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`project_save_project_id_index\` on \`project_save\` (\`project_id\`);`);

    this.addSql(`drop table if exists \`chat_messages\`;`);

    this.addSql(`drop table if exists \`project_saves\`;`);

    this.addSql(`drop table if exists \`projects\`;`);
  }

}
