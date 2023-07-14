import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string | undefined;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  password: string;
}
