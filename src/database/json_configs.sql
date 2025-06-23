-- SQL schema to store all JSON config files in a single table
CREATE TABLE json_configs (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(255) UNIQUE NOT NULL,  -- filename without .json
    config_data JSONB NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_json_configs_key ON json_configs(config_key);
