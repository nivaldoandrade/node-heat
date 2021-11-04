import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

interface RequestQuery {
	code: string;
}

class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { code } = request.query as unknown as RequestQuery;

		const authenticateUser = new AuthenticateUserService();

		const result = await authenticateUser.execute(code);

		return response.json(result);
	}
}

export default SessionsController;
