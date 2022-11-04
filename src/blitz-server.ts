import { setupBlitzServer } from '@blitzjs/next';
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from '@blitzjs/auth';
import db from '../prisma';
import { authConfig } from './blitz-client';

export const { gSSP, gSP, api } = setupBlitzServer({
	plugins: [
		AuthServerPlugin({
			...authConfig,
			storage: PrismaStorage(db),
			isAuthorized: simpleRolesIsAuthorized
		})
	],
});
