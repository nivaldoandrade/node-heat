import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from 'utils/AppError';

import authConfig from '../config/auth';

interface IPayload {
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		throw new AppError(401, 'JWT token is missing');
	}

	const [, token] = authToken.split(' ');

	try {
		const decored = verify(token, authConfig.jwt.secret);

		const { sub } = decored as IPayload;

		request.user_id = sub;

		return next();
	} catch (err) {
		throw new AppError(401, 'Invalid JWT token');
	}
}
