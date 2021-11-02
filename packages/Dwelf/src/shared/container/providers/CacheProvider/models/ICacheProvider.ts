export interface ICacheProvider {
  recover<T>(key: string): Promise<T | null>;
  save(key: string, value: string): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
