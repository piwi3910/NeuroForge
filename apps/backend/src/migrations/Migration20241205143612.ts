import { Migration } from '@mikro-orm/migrations';

export class Migration20241205143612 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`project_save__temp_alter\` (\`id\` integer not null primary key autoincrement, \`project_id\` text not null, \`name\` text not null, \`data\` text not null, \`created_at\` datetime not null, constraint \`project_save_project_id_foreign\` foreign key(\`project_id\`) references \`project\`(\`id\`) on update cascade);`);
    this.addSql(`insert into \`project_save__temp_alter\` select * from \`project_save\`;`);
    this.addSql(`drop table \`project_save\`;`);
    this.addSql(`alter table \`project_save__temp_alter\` rename to \`project_save\`;`);
    this.addSql(`create index \`project_save_project_id_index\` on \`project_save\` (\`project_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);
  }

}
