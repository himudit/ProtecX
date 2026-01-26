import crypto from 'crypto';
import { env } from '../config/env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

/**
 * Encrypt a string using AES-256-GCM
 */
export const encrypt = (text: string): string => {
    if (!env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY is not defined in environment variables');
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);

    const key = crypto.pbkdf2Sync(
        env.ENCRYPTION_KEY,
        salt,
        ITERATIONS,
        KEY_LENGTH,
        'sha512'
    );

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
};

/**
 * Decrypt a string using AES-256-GCM
 */
export const decrypt = (cipherText: string): string => {
    if (!env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY is not defined in environment variables');
    }

    const buffer = Buffer.from(cipherText, 'base64');

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + 16);
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + 16);

    const key = crypto.pbkdf2Sync(
        env.ENCRYPTION_KEY,
        salt,
        ITERATIONS,
        KEY_LENGTH,
        'sha512'
    );

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final('utf8');
};
