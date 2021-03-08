const express = require('express');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const Chat = require('./app/event/Chat.js');

// Environment variables
const PORT = process.env.PORT || 9090;
const HOST = process.env.HOST || '0.0.0.0';

http.listen(PORT, HOST, (err) => {
	if (err) {
		console.error('Error starting  server', err);
	} else {
		console.log('server listening at port ' + PORT + " and host " + HOST);
	}
});

app.use(express.json());							// For parsing application/json
app.use(express.urlencoded({ extended: true }));	// For parsing application/x-www-form-urlencoded

// Anything beginning with "/api" will go into this
app.use('/api', require('./app/routes/api'));

// Test
// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/html/index.html');
// });