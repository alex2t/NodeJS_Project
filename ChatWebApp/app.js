const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const{Users}= require('./models/UsersClass');
const{Global}= require('./models/Global');
var bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session);


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('./socket/groupchat')(io, Users);
require('./socket/friend')(io);
require('./socket/privatemessage')(io);
require('./socket/globalRoom')(io, Global);




// require('./socket/friend')(io, Users);

// Passport Config
require('./config/passport')(passport);

// jquery
var $ = require('jquery');

// DB Config
const cc = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    cc,
    { useNewUrlParser: true }
  )
  
 
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
   
  });
  

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static((path.join(__dirname ,'/public/'))));
app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db
    })
    
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.get('/', (req, res) => res.render('./registration/index'));
app.use('/', require('./routes/home.js'));
app.use('/users', require('./routes/users.js'));
app.use('/chat/:name', require('./routes/private.js'));


const groupName = require('./routes/groupName');
app.use(groupName.routes);

const PORT = process.env.PORT || 4500;

server.listen(PORT, console.log(`Server started on port ${PORT}`));
