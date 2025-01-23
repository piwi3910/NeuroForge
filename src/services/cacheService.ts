interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

interface CacheOptions {
  ttl: number; // Time to live in milliseconds
}

export class CacheService {
  private cache: Map<string, CacheEntry<unknown>>;
  private readonly defaultTTL: number;

  constructor(defaultTTL = 3600000) {
    // Default 1 hour TTL
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  public set<T>(key: string, value: T, options?: CacheOptions): void {
    const ttl = options?.ttl ?? this.defaultTTL;
    this.cache.set(key, {
      value,
      timestamp: Date.now() + ttl,
    });
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  public has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp) {
        this.cache.delete(key);
      }
    }
  }
}
