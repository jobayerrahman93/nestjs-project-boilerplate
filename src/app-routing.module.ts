import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { COMMON_ROUTES } from './common/common.router';
import { USER_ROUTES } from './user/user.router';

const Routes = [...USER_ROUTES, ...COMMON_ROUTES];
@Module({
  imports: [RouterModule.register(Routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
