-- SQL schema to store all JSON config files in a single table
CREATE TABLE json_configs (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(255) UNIQUE NOT NULL,  -- filename without .json
    config_data JSONB NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_json_configs_key ON json_configs(config_key);

CREATE TABLE media_files (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255),
  originalName VARCHAR(255),
  cloudinaryUrl TEXT,
  cloudinaryPublicId VARCHAR(255),
  fileSize INTEGER,
  mimeType VARCHAR(100),
  folder VARCHAR(255),
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);