import { Request, Response } from 'express';

import ShowProfileUserService from 'services/ShowProfileUserService';

class ProfileUserController {
	public async show(request: Request, response: Response) {
		const { user_id } = request;

		const showProfileUserService = new ShowProfileUserService();

		const result = await showProfileUserService.execute(user_id);

		return response.json(result);
	}
}

export default ProfileUserController;
