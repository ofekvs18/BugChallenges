# Challenge 1: The Phantom Package

## Problem Description
This Node.js application fails to start due to corrupted SHA hashes in the package-lock.json file. Participants need to identify and fix the integrity issues.

## Bug Details
- Express package has corrupted SHA512 hash
- Moment package has wrong integrity hash
- npm ci fails with integrity check errors

## Solution
1. Identify corrupted hashes in package-lock.json
2. Either fix the hashes or regenerate package-lock.json
3. Rebuild the Docker container

## Testing
Once fixed, the application should:
- Start successfully on port 3001
- Serve the web interface
- Respond to all API endpoints

## API Endpoints
- GET / - Web interface
- GET /api/status - Application status
- GET /api/data - Data processing demo
- GET /api/external - External API test