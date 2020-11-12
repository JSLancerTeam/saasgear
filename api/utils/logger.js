import bunyan from 'bunyan';
import fs from 'fs';

fs.existsSync('logs') || fs.mkdirSync('logs');

const logger = bunyan.createLogger({
  name: 'jsl-sassgear',
  streams: [{
    type: 'rotating-file',
    path: 'logs/info.log',
    period: '1d',
    level: 'info',
    count: 3
  }, {
    type: 'rotating-file',
    path: 'logs/error.log',
    period: '1d',
    level: 'error',
    count: 7
  }, {
    type: 'rotating-file',
    path: 'logs/trace.log',
    period: '1d',
    level: 'trace',
    count: 3
  }]
});

export default logger;