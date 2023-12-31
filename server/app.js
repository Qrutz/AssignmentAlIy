var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var session = require('express-session');
var history = require('connect-history-api-fallback');
var dotenv = require('dotenv').config();
var passport = require('passport');

const MeetingRouter = require('./routes/MeetingRouter');
const AuthRouter = require('./routes/Auth.router');
const UserRouter = require('./routes/User.router');
const GroupRouter = require('./routes/GroupRouter');
const MongoStore = require('connect-mongo');

// Variables
var mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function (err) {
  if (err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: mongoURI,
    }),
  })
);

// initialize passport
app.use(passport.initialize());

app.use(passport.session());

// Import routes
app.get('/api', function (req, res) {
  res.json({ message: 'Welcome to your DIT342 backend ExpressJS project!' });
});

// Meetings router
app.use('/api/meetings', MeetingRouter);
// User router
app.use('/api/users', UserRouter);
// Auth router
app.use('/api/auth', AuthRouter);
// Group router
app.use('/api/groups', GroupRouter);
// Task router
app.use('/api/tasks', require('./routes/Task.router'));

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack);
  var err_res = {
    message: err.message,
    error: {},
  };
  if (env === 'development') {
    // Return sensitive stack trace only in dev mode
    err_res['error'] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
