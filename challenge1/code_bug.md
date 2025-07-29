# 🐛 Challenge 1: The Phantom Package

## Overview
Welcome to the first debugging challenge! You've been given a Node.js web application that **should** work perfectly, but something's preventing it from starting up. Your mission is to identify and fix the issue.

## The Situation
The development team was working late last night deploying this application. Everything seemed fine in their local environment, but when they tried to build it using Docker, something went wrong. The container build process is failing, and the application won't start.

The team is stumped - the code looks correct, the dependencies are standard packages, and the configuration appears normal. They need your debugging expertise to get this application running.

## Your Mission
1. **Identify** what's preventing the application from building/starting
2. **Diagnose** the root cause of the issue
3. **Fix** the problem using the most appropriate solution
4. **Verify** that the application runs successfully

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Basic familiarity with Node.js and npm

### Setup Instructions
1. Clone or download this challenge directory
2. Navigate to the challenge folder:
   ```bash
   cd challenge1-phantom-package
   ```
3. Attempt to build and run the application:
   ```bash
   docker-compose up --build
   ```

### What You Should See (When Fixed)
Once you've successfully resolved the issue, you should be able to:
- Build the Docker container without errors
- Access the web application at `http://localhost:3000`
- See a working web interface with API endpoints
- Test various functionality through the web UI

## Application Features
The application includes:
- **Web Interface**: A responsive dashboard at the root URL
- **Status API**: Real-time application status and package information
- **Data Processing**: Sample data manipulation using utility libraries
- **External API Integration**: Demonstrates HTTP client functionality

## Debugging Tips
- Pay close attention to error messages during the build process
- Check the container logs if the build fails: `docker-compose logs`
- Consider what might cause package installation to fail
- Think about what could make identical packages behave differently
- Use your debugging tools and don't rely only on visual inspection

## Success Criteria
You've completed the challenge when:
- [ ] Docker container builds successfully
- [ ] Application starts without errors
- [ ] Web interface loads at `http://localhost:3000`
- [ ] All API endpoints respond correctly
- [ ] No console errors in the browser

## Hints (Use Only If Stuck)
<details>
<summary>Click for Hint 1 (Mild)</summary>
The issue is related to package management and dependency installation. Focus on the npm build process.
</details>

<details>
<summary>Click for Hint 2 (Medium)</summary>
Something about the packages doesn't match what npm expects. Check what npm is complaining about during installation.
</details>

## Evaluation
Your solution will be evaluated on:
- **Correctness**: Does the application work after your fix?
- **Approach**: Did you use proper debugging methodology?
- **Efficiency**: How quickly did you identify and resolve the issue?
- **Best Practices**: Is your solution secure and maintainable?

## Questions to Consider
- What type of issue was this?
- How could this problem have been prevented?
- What tools helped you diagnose the problem?
- What would you do differently in a production environment?

## Time Estimate
**Expected completion time: 15-20 minutes**

Good luck, and happy debugging! 🔍

