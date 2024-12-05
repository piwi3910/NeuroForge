import Database from 'better-sqlite3';
import fs from 'fs/promises';
import path from 'path';
import { Project, ProjectDetails, ProjectWithDetails, ChatMessage, ProjectDetailsUpdate } from '../types/project';

interface ProjectRow {
    id: string;
    name: string;
    path: string;
    description: string;
    git_repo: string | null;
    system_prompt: string;
    status: string;
    created_at: string;
    updated_at: string;
    details_name: string | null;
    details_description: string | null;
    details_stack: string | null;
    status_name: 'complete' | 'incomplete';
    status_description: 'complete' | 'incomplete';
    status_stack: 'complete' | 'incomplete';
    details_created_at: string;
    details_updated_at: string;
}

export class DatabaseService {
    private db: Database.Database;
    private static instance: DatabaseService;

    private constructor() {
        // Create db directory if it doesn't exist
        const dbDir = path.join(__dirname, '..', 'db');
        fs.mkdir(dbDir, { recursive: true }).catch(console.error);

        const dbPath = path.join(dbDir, 'neuroforge.db');
        this.db = new Database(dbPath);
        this.db.pragma('foreign_keys = ON');
        this.initializeDatabase();
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    private async initializeDatabase() {
        try {
            // Read schema.sql
            const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
            const schema = await fs.readFile(schemaPath, 'utf-8');
            
            // Execute schema as a transaction
            this.db.exec(schema);

            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    // Project operations
    public createProject(id: string, name: string, projectPath: string, description: string, gitRepo?: string): Project {
        const stmt = this.db.prepare(`
            INSERT INTO projects (id, name, path, description, git_repo, status)
            VALUES (?, ?, ?, ?, ?, 'defining')
            RETURNING *
        `);
        const project = stmt.get(id, name, projectPath, description, gitRepo || null) as Project;

        // Initialize project details
        const detailsStmt = this.db.prepare(`
            INSERT INTO project_details (project_id)
            VALUES (?)
            RETURNING *
        `);
        detailsStmt.run(id);

        return project;
    }

    public updateProjectDetails(projectId: string, details: ProjectDetailsUpdate): ProjectDetails {
        const stmt = this.db.prepare(`
            UPDATE project_details
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                stack = COALESCE(?, stack),
                status_name = COALESCE(?, status_name),
                status_description = COALESCE(?, status_description),
                status_stack = COALESCE(?, status_stack)
            WHERE project_id = ?
            RETURNING *
        `);

        return stmt.get(
            details.name,
            details.description,
            details.stack,
            details.status_name,
            details.status_description,
            details.status_stack,
            projectId
        ) as ProjectDetails;
    }

    public getProjectDetails(projectId: string): ProjectWithDetails | null {
        const stmt = this.db.prepare(`
            SELECT 
                p.*,
                pd.name as details_name,
                pd.description as details_description,
                pd.stack as details_stack,
                pd.status_name,
                pd.status_description,
                pd.status_stack,
                pd.created_at as details_created_at,
                pd.updated_at as details_updated_at
            FROM projects p
            LEFT JOIN project_details pd ON p.id = pd.project_id
            WHERE p.id = ?
        `);

        const row = stmt.get(projectId) as ProjectRow | undefined;
        if (!row) return null;

        return {
            id: row.id,
            name: row.name,
            path: row.path,
            description: row.description,
            git_repo: row.git_repo,
            system_prompt: row.system_prompt,
            status: row.status,
            created_at: new Date(row.created_at),
            updated_at: new Date(row.updated_at),
            details: {
                project_id: row.id,
                name: row.details_name,
                description: row.details_description,
                stack: row.details_stack,
                status_name: row.status_name,
                status_description: row.status_description,
                status_stack: row.status_stack,
                created_at: new Date(row.details_created_at),
                updated_at: new Date(row.details_updated_at)
            }
        };
    }

    public deleteProject(projectId: string): void {
        const stmt = this.db.prepare('DELETE FROM projects WHERE id = ?');
        stmt.run(projectId);
    }

    // Chat message operations
    public saveChatMessage(projectId: string, role: string, content: string): ChatMessage {
        const stmt = this.db.prepare(`
            INSERT INTO chat_messages (project_id, role, content)
            VALUES (?, ?, ?)
            RETURNING *
        `);
        return stmt.get(projectId, role, content) as ChatMessage;
    }

    public getChatMessages(projectId: string): ChatMessage[] {
        const stmt = this.db.prepare(`
            SELECT * FROM chat_messages
            WHERE project_id = ?
            ORDER BY timestamp ASC
        `);
        return stmt.all(projectId) as ChatMessage[];
    }

    public clearChatHistory(projectId: string): void {
        const stmt = this.db.prepare('DELETE FROM chat_messages WHERE project_id = ?');
        stmt.run(projectId);
    }
}

export const dbService = DatabaseService.getInstance();
