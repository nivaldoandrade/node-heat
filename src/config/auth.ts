export default {
	jwt: {
		secret: process.env.JWT_SECRET || 'nwl-heat-secret',
		expiresIn: '1d',
	},
};
