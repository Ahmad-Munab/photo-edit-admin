export interface DatabaseConfig {
  connectionString: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
  command: string;
  oid?: number;
  fields?: any[];
}

export interface ConfigCache {
  data: any;
  timestamp: number;
}

export interface ConfigManagerOptions {
  dbConfig?: DatabaseConfig;
  cacheTimeout?: number;
}
