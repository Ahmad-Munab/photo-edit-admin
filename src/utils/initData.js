// This file is now a no-op. All data initialization and migration should be handled via Neon PostgreSQL only.

// If you need to migrate legacy data, use a dedicated migration script that reads from old sources and writes to Neon.

export default function initData() {
  // No file/JSON logic here. All data is in Neon.
  return null;
}
