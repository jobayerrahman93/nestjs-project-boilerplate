import { UserAuthController } from './controller/user.auth.controller';
import { UserModule } from './user.module';

export const USER_ROUTES = [
  {
    path: 'api/v1/user',
    module: UserModule,
    children: [
      {
        path: 'auth',
        module: UserAuthController,
      },
    ],
  },
];
