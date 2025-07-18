export class FirestoreHelper {
    constructor({ projectId, databaseId = '(default)' }) {
      this.projectId = projectId;
      this.databaseId = databaseId;
    }
  }
  
  export function wrapField(value) {
    if (typeof value === 'string') return { stringValue: value };
    if (typeof value === 'boolean') return { booleanValue: value };
    if (value instanceof Date) return { timestampValue: value.toISOString() };
    if (value === null || value === undefined) return { nullValue: null };
    if (
      typeof value === 'object' &&
      (value.stringValue || value.booleanValue || value.timestampValue || value.nullValue)
    ) {
      return value;
    }
    throw new Error(`Unsupported value type for Firestore: ${value}`);
  }
  