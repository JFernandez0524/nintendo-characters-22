import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize Express web server
const app = express();

// Configure express with middleware
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/characters', async (req, res) => {
  // Read data from JSON file, this will set db.data content
  await db.read();
  // If db.json doesn't exist, db.data will be null
  // Use the code below to set default data
  // db.data = db.data || { posts: [] } // For Node < v15.x
  db.data ||= { characters: [{ name: 'Mario', game: 'Super Mario Bros' }] }; // For Node >= 15.x
  res.json(db.data);
});

app.post('/api/characters', async (req, res) => {
  console.log(req.body);
  db.data.characters.push(req.body);
  await db.write();
  res.json(db.data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Running on Port 3000'));
