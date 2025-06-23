/**
 * Shared fallback utilities for React components
 */

export const PLACEHOLDER_IMAGE = "/images/placeholder.png";

/**
 * Deep merge two objects, preferring values from 'data' but filling missing fields from 'defaults'.
 * Arrays are replaced, not merged.
 */
export function getWithFallback<T>(defaults: T, data?: Partial<T>): T {
  if (typeof defaults !== 'object' || defaults === null) return (data as T) || defaults;
  if (typeof data !== 'object' || data === null) return defaults;
  const result: any = Array.isArray(defaults) ? [...defaults] : { ...defaults };
  for (const key in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, key)) {
      if (
        typeof (defaults as any)[key] === 'object' &&
        (defaults as any)[key] !== null &&
        !Array.isArray((defaults as any)[key])
      ) {
        result[key] = getWithFallback((defaults as any)[key], (data as any)[key]);
      } else if (Array.isArray((defaults as any)[key])) {
        result[key] = (data as any)[key] && (data as any)[key].length > 0 ? (data as any)[key] : (defaults as any)[key];
      } else {
        result[key] = (data as any)[key] !== undefined ? (data as any)[key] : (defaults as any)[key];
      }
    }
  }
  // Add any extra keys from data
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key) && result[key] === undefined) {
      result[key] = (data as any)[key];
    }
  }
  return result;
} 