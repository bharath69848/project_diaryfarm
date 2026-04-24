import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import pool from './config/db.js'
import dotenv from 'dotenv'
import { authMiddleware } from './middleware/auth.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

app.get('/', (req, res) => {
  res.send("Server Running");
})

//register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password, username)
       VALUES ($1, $2, $3)
       RETURNING id, email, username`,
      [email, hashedPassword, username]
    )

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" })

    res.json({ token })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" })
  }
})

app.get('/profile', authMiddleware, async (req, res) => {
  const result = await pool.query(
    'SELECT id, email, username FROM users WHERE id = $1',
    [req.user.id]
  )

  res.json(result.rows[0]);
})

app.listen(3000, () => {
  console.log("Server Running on port 3k");
})