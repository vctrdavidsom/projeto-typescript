import { execSync } from 'child_process';
import { join } from 'path';
import { unlinkSync } from 'fs';
import '@jest/globals';

// Remove test database if it exists
const testDbPath = join(__dirname, 'test.sqlite');
try {
  unlinkSync(testDbPath);
} catch (error) {
  // Ignore error if file doesn't exist
}

// Set test environment variables
process.env.DATABASE_URL = `sqlite://${testDbPath}`;
process.env.NODE_ENV = 'test';

// Run migrations for test database
beforeAll(() => {
  execSync('npm run migration:run', { stdio: 'inherit' });
});

// Clean up after all tests
afterAll(() => {
  try {
    unlinkSync(testDbPath);
  } catch (error) {
    // Ignore error if file doesn't exist
  }
}); 