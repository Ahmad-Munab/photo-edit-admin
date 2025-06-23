// Migration script to move JSON files from src/data/ to the json_configs table in PostgreSQL
// Usage: Run with `node migrate-json-to-db.js` after setting up your DB_URL in .env

import 'dotenv/config';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { query } from './src/utils/db.js';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

async function migrate() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = await readdir(dataDir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const key = path.basename(file, '.json');
      const filePath = path.join(dataDir, file);
      try {
        const content = await readFile(filePath, 'utf-8');
        const json = JSON.parse(content);
        await query(
          `INSERT INTO json_configs (config_key, config_data, last_updated)
           VALUES ($1, $2, CURRENT_TIMESTAMP)
           ON CONFLICT (config_key) DO UPDATE SET config_data = EXCLUDED.config_data, last_updated = CURRENT_TIMESTAMP`,
          [key, json]
        );
        console.log(`Migrated ${file} to json_configs as '${key}'`);
      } catch (err) {
        console.error(`Failed to migrate ${file}:`, err);
      }
    }
  }
  console.log('Migration complete.');
}

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

migrate().catch(console.error);
