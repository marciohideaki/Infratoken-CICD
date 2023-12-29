const express = require("express");
const http = require('http');

const app = express();
const router = express.Router();
const port = 3000;
const version = "0.0.1";

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.get("/", (req, res) => {
	res.send(
		`<h1>Infratoken</h1> <h3>Welcome to Infratoken CI-CD pipeline!</h3> <h3 style="color: green">Version ${version}</h3>`
	);
});

app.get("/ping", (req, res) => {
	res.send("<h3>PONG!</h3>");
});

app.use('/api/v1', router);

app.get('/healthcheck', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

console.log(app.routes);

app.listen(port, "0.0.0.0", () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on port: ${port}`);
});