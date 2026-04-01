const cache = new Map<string, { payload: any, expiresAt: number }>();

export const getCache = async (key: string) => {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return entry.payload;
};

export const setCache = async (key: string, source: string, payload: any, ttlMinutes: number = 1440) => {
  const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
  cache.set(key, { payload, expiresAt });
};
