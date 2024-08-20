const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});
const User = mongoose.model('User', userSchema);

// Set up EJS view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
