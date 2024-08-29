import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { dbconnect } from './config/databaseConfig.js';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dbconnect();

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
