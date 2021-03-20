const express = require('express');
const app = express();
const http = require('http').Server(app);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
// const io = require('socket.io')(http);
// const Chat = require('./app/event/Chat.js');

// Environment variables
const PORT = process.env.PORT || 9090;
const HOST = process.env.HOST || '0.0.0.0';

const corsOpts = {
	origin: '*',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}

http.listen(PORT, HOST, (err) => {
	if (err) {
		console.error('Error starting  server', err);
	} else {
		console.log('server listening at port ' + PORT + " and host " + HOST);
	}
});

app.use(express.json());							// For parsing application/json
app.use(express.urlencoded({ extended: true }));	// For parsing application/x-www-form-urlencoded
app.use(cookieParser());							// For parsing Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(express.static(__dirname + '/html'));       // For let the HTML pages public
app.use(cors(corsOpts));       						// For fixing CORS Problems

app.use(session({
    name: 'SessionCookie',
    secret: 'Shsh!Secret!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 } // Secure = True para usar o Secure do HTTPS
}));

// Anything beginning with "/api" will go into this
app.use('/api', require('./app/routes/api'));

// Login
app.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
});

// Test
app.get('/test', function(req, res){
	res.sendFile(__dirname + '/html/test/index.html');
});