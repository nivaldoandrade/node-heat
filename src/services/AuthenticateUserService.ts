import api from 'axios';
import { sign } from 'jsonwebtoken';

import prismaClient from '../prisma';
import authConfig from '../config/auth';

/**
 * Pega o code pelo query params; OK
 * Pegar o access token pelo code; OK
 * Pega info do usuario no github; OK
 * Verificar se o usuario existe no BD;
 * --- Sim: retornar o usuario e access token;
 * --- Não: criar um novo usuario e retornar o usuario e access token;
 */

interface IAccessTokenResponse {
	access_token: string;
	token_type: string;
}

interface IUserResponse {
	id: number;
	login: string;
	avatar_url: string;
	name: string;
	email: string;
}

interface IUser {
	id: string;
	github_id: number;
	name: string;
	login: string;
	email: string;
	avatar_url: string;
}

interface IResponse {
	user: IUser;
	token: string;
}

class AuthenticateUserService {
	public async execute(code: string): Promise<IResponse> {
		const { data: accessTokenResponse } = await api.post<IAccessTokenResponse>(
			'https://github.com/login/oauth/access_token',
			null,
			{
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code,
				},
				headers: {
					Accept: 'application/json',
				},
			},
		);

		const response = await api.get<IUserResponse>('https://api.github.com/user', {
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`,
			},
		});

		const { id, name, login, email, avatar_url } = response.data;

		let user = await prismaClient.user.findFirst({
			where: {
				github_id: id,
			},
		});

		if (!user) {
			user = await prismaClient.user.create({
				data: {
					github_id: id,
					name,
					login,
					email,
					avatar_url,
				},
			});
		}

		const { expiresIn, secret } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		return { user, token };
	}
}

export { AuthenticateUserService };
