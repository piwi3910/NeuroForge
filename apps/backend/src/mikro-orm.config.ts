import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import path from 'path';
import { Project, ChatMessage, ProjectSave } from './entities';

const config: Options = {
  driver: SqliteDriver,
  dbName: path.join(process.cwd(), 'db', 'neuroforge.db'),
  entities: [Project, ChatMessage, ProjectSave],
  migrations: {
    path: path.join(process.cwd(), 'dist', 'migrations'),
    pathTs: path.join(process.cwd(), 'src', 'migrations'),
  },
  seeder: {
    path: path.join(process.cwd(), 'dist', 'seeders'),
    pathTs: path.join(process.cwd(), 'src', 'seeders'),
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
