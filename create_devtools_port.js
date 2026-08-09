const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\e998594b-8471-4366-bf84-4aa6fd564f9d\\.system_generated\\tasks\\task-1745.log';
const targetDir = 'C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User Data';
const targetFile = path.join(targetDir, 'DevToolsActivePort');

if (!fs.existsSync(logPath)) {
    console.error('Log file does not exist');
    process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const match = content.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)(\/devtools\/browser\/[a-f0-9-]+)/);

if (match) {
    const port = match[1];
    const wsPath = match[2];
    console.log(`Found Chrome running on port ${port} with path ${wsPath}`);
    
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Write in the exact format DevToolsActivePort expects:
    // line 1: port
    // line 2: path
    fs.writeFileSync(targetFile, `${port}\n${wsPath}\n`);
    console.log(`Wrote to ${targetFile}`);
} else {
    console.error('Could not find DevTools listening line in log');
    console.log('Log content was:', content);
}
