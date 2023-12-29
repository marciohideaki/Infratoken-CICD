const express = require("express");
const http = require('http');

const app = express();
const router = express.Router();
const port = 3000;
const version = "0.0.1";

router.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET');
	next();
  });

app.get("/", (req, res) => {
	res.send(
		`<h1>Infratoken</h1> <h3>Welcome to Infratoken CI-CD!</h3> <h3 style="color: green">Version ${version}</h3>`
	);
});

app.get("/ping", (req, res) => {
	res.send("<h3>PONG!</h3>");
});

app.use('/healthcheck', require('./healthcheck/healthcheck.routes'));

app.use('/api/v1', router);

app.listen(port, "0.0.0.0", () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on port: ${port}`);
});