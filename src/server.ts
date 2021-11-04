import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import AppError from 'utils/AppError';
import routes from './routes';

const app = express();

const server = createServer(app);
export const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', socket => {
	console.log(`New client connected with id ${socket.id}`);
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/github', (req, res) => {
	return res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
	);
});

app.get('/signin/callback', (req, res) => {
	const { code } = req.query;

	return res.json(code);
});

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
	if (error instanceof AppError) {
		console.log(error);
		return response.status(error.statusCode).json({
			status: 'error',
			errorCode: error.errorCode,
		});
	}

	console.error(error);

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

server.listen(3333, () => {
	console.log('🚀 Server is running on port 3333');
});
