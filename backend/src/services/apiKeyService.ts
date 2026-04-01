import { randomBytes } from 'crypto';

export interface ApiKey {
  id: string;
  key: string;      // The actual token
  name: string;     // User identifier string
  createdAt: string;
  active: boolean;
  clientId: string; // The owner
}

const keysDB = new Map<string, ApiKey>();

export const createKey = (clientId: string, name: string): ApiKey => {
  const generatedToken = randomBytes(32).toString('hex');
  const newKey: ApiKey = {
    id: `key_${Date.now()}`,
    key: generatedToken,
    name,
    createdAt: new Date().toISOString(),
    active: true,
    clientId,
  };
  keysDB.set(newKey.id, newKey);
  return newKey;
};

export const listKeys = (clientId: string): Omit<ApiKey, 'key'>[] => {
  const result: Omit<ApiKey, 'key'>[] = [];
  keysDB.forEach((val) => {
    if (val.clientId === clientId) {
      // Safe projection removing the actual secret key
      result.push({
        id: val.id,
        name: val.name,
        createdAt: val.createdAt,
        active: val.active,
        clientId: val.clientId,
      });
    }
  });
  return result;
};

export const revokeKey = (clientId: string, keyId: string): boolean => {
  const existing = keysDB.get(keyId);
  if (existing && existing.clientId === clientId) {
    keysDB.delete(keyId);
    return true;
  }
  return false;
};

// Admin Endpoints
export const findAllKeysAdmin = (): ApiKey[] => {
  return Array.from(keysDB.values());
};

export const toggleKeyAdmin = (keyId: string): ApiKey | null => {
  const existing = keysDB.get(keyId);
  if (existing) {
    existing.active = !existing.active;
    keysDB.set(keyId, existing);
    return existing;
  }
  return null;
};

// Authentication Validator
export const validateKey = (tokenToValidate: string): ApiKey | null => {
  for (const [_, val] of keysDB.entries()) {
    if (val.key === tokenToValidate && val.active) {
      return val;
    }
  }
  return null;
};
