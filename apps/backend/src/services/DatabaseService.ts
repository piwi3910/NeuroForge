import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs/promises';
import { ProjectWithDetails, DatabaseRow, ChatMessage, ProjectSave } from '../types/project';

interface Database {
    run(sql: string, params?: unknown[]): Promise<void>;
    get(sql: string, params?: unknown[]): Promise<DatabaseRow>;
    all(sql: string, params?: unknown[]): Promise<DatabaseRow[]>;
    exec(sql: string): Promise<void>;
}

class DatabaseService {
    private db: Database | null = null;

    async initialize() {
        if (this.db) {
            return;
        }

        // Create db directory if it doesn't exist
        const dbDir = path.join(process.cwd(), 'db');
        await fs.mkdir(dbDir, { recursive: true });

        // Initialize database
        this.db = await this.openDatabase(path.join(dbDir, 'neuroforge.db'));

        // Enable foreign keys
        await this.db.run('PRAGMA foreign_keys = ON');

        // Load and execute schema
        const schema = await fs.readFile(path.join(process.cwd(), 'src', 'db', 'schema.sql'), 'utf-8');
        await this.db.exec(schema);

        console.log('Database initialized successfully');
    }

    private openDatabase(filename: string): Promise<Database> {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(filename, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Wrap database methods in promises
                const wrappedDb: Database = {
                    run: (sql: string, params: unknown[] = []) => {
                        return new Promise((resolve, reject) => {
                            db.run(sql, params, (err) => {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                    },
                    get: (sql: string, params: unknown[] = []) => {
                        return new Promise((resolve, reject) => {
                            db.get(sql, params, (err, row) => {
                                if (err) reject(err);
                                else resolve(row as DatabaseRow);
                            });
                        });
                    },
                    all: (sql: string, params: unknown[] = []) => {
                        return new Promise((resolve, reject) => {
                            db.all(sql, params, (err, rows) => {
                                if (err) reject(err);
                                else resolve(rows as DatabaseRow[]);
                            });
                        });
                    },
                    exec: (sql: string) => {
                        return new Promise((resolve, reject) => {
                            db.exec(sql, (err) => {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                    }
                };

                resolve(wrappedDb);
            });
        });
    }

    async createProject(id: string, name: string, projectPath: string, description?: string, gitRepo?: string) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.run(
            'INSERT INTO projects (id, name, path, description, git_repo) VALUES (?, ?, ?, ?, ?)',
            [id, name, projectPath, description || null, gitRepo || null]
        );
    }

    async getProjectDetails(projectId: string): Promise<ProjectWithDetails | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const project = await this.db.get(
            'SELECT * FROM projects WHERE id = ?',
            [projectId]
        );

        if (!project) {
            return null;
        }

        return {
            id: project.id as string,
            name: project.name as string,
            path: project.path as string,
            description: project.description as string | null,
            git_repo: project.git_repo as string | null,
            details: {
                name: project.name as string,
                description: project.description as string | null,
                stack: null,
                status: {
                    name: 'incomplete',
                    description: 'incomplete',
                    stack: 'incomplete'
                }
            }
        };
    }

    async updateProjectDetails(projectId: string, updates: Partial<ProjectWithDetails>) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const setClauses: string[] = [];
        const values: unknown[] = [];

        if (updates.name !== undefined) {
            setClauses.push('name = ?');
            values.push(updates.name);
        }
        if (updates.description !== undefined) {
            setClauses.push('description = ?');
            values.push(updates.description);
        }
        if (updates.git_repo !== undefined) {
            setClauses.push('git_repo = ?');
            values.push(updates.git_repo);
        }

        if (setClauses.length === 0) {
            return;
        }

        values.push(projectId);

        await this.db.run(
            `UPDATE projects SET ${setClauses.join(', ')} WHERE id = ?`,
            values
        );
    }

    async deleteProject(projectId: string) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        // First delete related records
        await this.db.run('DELETE FROM chat_messages WHERE project_id = ?', [projectId]);
        await this.db.run('DELETE FROM project_saves WHERE project_id = ?', [projectId]);

        // Then delete the project
        await this.db.run('DELETE FROM projects WHERE id = ?', [projectId]);
    }

    async saveChatMessage(projectId: string, role: string, content: string) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.run(
            'INSERT INTO chat_messages (project_id, role, content) VALUES (?, ?, ?)',
            [projectId, role, content]
        );
    }

    async getChatMessages(projectId: string): Promise<ChatMessage[]> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const messages = await this.db.all(
            'SELECT * FROM chat_messages WHERE project_id = ? ORDER BY timestamp ASC',
            [projectId]
        );

        return messages.map(msg => ({
            role: msg.role as string,
            content: msg.content as string,
            timestamp: new Date(msg.timestamp as string)
        }));
    }

    async clearChatHistory(projectId: string) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.run('DELETE FROM chat_messages WHERE project_id = ?', [projectId]);
    }

    async saveProjectState(projectId: string, name: string, data: string) {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.run(
            'INSERT INTO project_saves (project_id, name, data) VALUES (?, ?, ?)',
            [projectId, name, data]
        );
    }

    async loadProjectState(projectId: string, name: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const save = await this.db.get(
            'SELECT data FROM project_saves WHERE project_id = ? AND name = ?',
            [projectId, name]
        );

        return save ? (save.data as string) : null;
    }

    async listProjectSaves(projectId: string): Promise<string[]> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const saves = await this.db.all(
            'SELECT name FROM project_saves WHERE project_id = ? ORDER BY created_at DESC',
            [projectId]
        );

        return saves.map(save => save.name as string);
    }
}

export const dbService = new DatabaseService();
