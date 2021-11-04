import AppError from 'utils/AppError';
import prismaClient from '../prisma';

import { io } from '../server';

interface IRequest {
	message: string;
	user_id: string;
}

/**
 * VERIFICAR SE O USER_ID É NUMBER OU STRING
 */

class CreateMessageService {
	public async execute({ message, user_id }: IRequest) {
		if (!message) {
			throw new AppError(400, 'Message is required');
		}

		const messageCreated = await prismaClient.message.create({
			data: {
				message,
				user_id,
			},
			include: {
				user: true,
			},
		});

		const messageIO = {
			message: messageCreated.message,
			created_at: messageCreated.created_at,
			user: {
				id: messageCreated.user_id,
				name: messageCreated.user.name,
				avatar_url: messageCreated.user.avatar_url,
			},
		};

		io.emit('message', messageIO);

		return messageCreated;
	}
}

export default CreateMessageService;
