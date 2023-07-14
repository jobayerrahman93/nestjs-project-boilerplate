import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { USER_ROUTES } from './user/user.router';

const Routes = [...USER_ROUTES];
@Module({
  imports: [RouterModule.register(Routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
