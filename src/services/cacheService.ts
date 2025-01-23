interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class CacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private readonly ttl: number;

  constructor(ttlInSeconds: number = 3600) {
    this.ttl = ttlInSeconds * 1000; // Convert to milliseconds
    this.startCleanupInterval();
  }

  /**
   * Store a value in the cache
   * @param key Cache key
   * @param value Value to store
   */
  set<T>(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Retrieve a value from the cache
   * @param key Cache key
   * @returns The cached value or undefined if not found or expired
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return undefined;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Remove a value from the cache
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all expired entries from the cache
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Start the automatic cleanup interval
   */
  private startCleanupInterval(): void {
    // Run cleanup every hour
    setInterval(() => this.cleanup(), 3600000);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of entries in the cache
   */
  get size(): number {
    return this.cache.size;
  }
}
