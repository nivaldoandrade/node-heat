import AppError from 'utils/AppError';
import prismaClient from '../prisma';

class ShowProfileUserService {
	public async execute(user_id: string) {
		const user = prismaClient.user.findFirst({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			throw new AppError(404, 'User not fount');
		}

		return user;
	}
}

export default ShowProfileUserService;
