import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, '../logs/error.log');

const logError = (err) => {
    const logMessage = `${new Date().toISOString()} - ${err.stack}\n`;

    const dir = path.dirname(LOG_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.appendFile(LOG_FILE, logMessage, (error) => {
        if (error) {
            console.error('Failed to write to log file:', error);
        }
    });
};

export { logError };
