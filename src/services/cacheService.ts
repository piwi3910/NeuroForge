import * as vscode from 'vscode';
import * as crypto from 'crypto';

interface CacheEntry<T> {
    value: T;
    timestamp: number;
    expiresAt: number;
}

export class CacheService {
    private cache: Map<string, CacheEntry<any>>;
    private readonly defaultTTL: number = 1000 * 60 * 60; // 1 hour

    constructor() {
        this.cache = new Map();
        this.startCleanupInterval();
    }

    /**
     * Generates a cache key for the given parameters
     * @param prefix Cache key prefix
     * @param params Parameters to include in key
     * @returns Cache key
     */
    private generateKey(prefix: string, params: any): string {
        const hash = crypto.createHash('sha256');
        hash.update(prefix + JSON.stringify(params));
        return hash.digest('hex');
    }

    /**
     * Gets a value from the cache
     * @param prefix Cache key prefix
     * @param params Parameters for the key
     * @returns Cached value or undefined
     */
    public get<T>(prefix: string, params: any): T | undefined {
        const key = this.generateKey(prefix, params);
        const entry = this.cache.get(key);

        if (!entry) {
            return undefined;
        }

        if (entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value as T;
    }

    /**
     * Sets a value in the cache
     * @param prefix Cache key prefix
     * @param params Parameters for the key
     * @param value Value to cache
     * @param ttl Time to live in milliseconds
     */
    public set<T>(prefix: string, params: any, value: T, ttl: number = this.defaultTTL): void {
        const key = this.generateKey(prefix, params);
        const now = Date.now();

        this.cache.set(key, {
            value,
            timestamp: now,
            expiresAt: now + ttl
        });
    }

    /**
     * Clears expired entries from the cache
     */
    private cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.expiresAt < now) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Starts the cleanup interval
     */
    private startCleanupInterval(): void {
        setInterval(() => this.cleanup(), 1000 * 60 * 15); // Clean every 15 minutes
    }

    /**
     * Clears the entire cache
     */
    public clear(): void {
        this.cache.clear();
    }

    /**
     * Gets cache statistics
     * @returns Cache statistics
     */
    public getStats(): Record<string, number> {
        const now = Date.now();
        let activeEntries = 0;
        let expiredEntries = 0;

        for (const entry of this.cache.values()) {
            if (entry.expiresAt < now) {
                expiredEntries++;
            } else {
                activeEntries++;
            }
        }

        return {
            totalEntries: this.cache.size,
            activeEntries,
            expiredEntries
        };
    }
}