import { logger } from '../utils/logger.js';
import { startDashboardServer } from '../server/dashboardServer.js';
import { exec } from 'child_process';
import os from 'os';

export async function dashboardCommand(options) {
  logger.header('Launching EAG Interactive Web Dashboard');
  
  const port = options.port || 3333;
  startDashboardServer(port);

  if (!options.noOpen) {
    const url = `http://localhost:${port}`;
    logger.step(`Opening browser to ${url}...`);
    
    let command;
    switch (os.platform()) {
      case 'darwin':
        command = `open ${url}`;
        break;
      case 'win32':
        command = `start "" "${url}"`;
        break;
      default:
        command = `xdg-open ${url}`;
        break;
    }
    
    try {
      exec(command, (err) => {
        if (err) {
          logger.error(`Failed to auto-open browser. Please visit ${url} manually.`);
        }
      });
    } catch (e) {
      logger.error(`Failed to auto-open browser. Please visit ${url} manually.`);
    }
  }
}
