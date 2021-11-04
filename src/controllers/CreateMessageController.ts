import { Request, Response } from 'express';
import CreateMessageService from 'services/CreateMessageService';

class CreateMessageController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { message } = request.body;
		const { user_id } = request;

		const createMessage = new CreateMessageService();

		const result = await createMessage.execute({ message, user_id });

		return response.json(result);
	}
}

export default CreateMessageController;
