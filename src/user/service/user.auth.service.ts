import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import config from 'src/utils/config/config';
import Lib from 'src/utils/lib/lib';
import { IloginBody } from 'src/utils/types/bind.type';
import { createUserDto } from '../dto';

@Injectable()
export class UserAuthService {
  constructor(private readonly prisma: PrismaService) {}

  // register member
  public async registerMember(
    createUserDto: createUserDto,
    files: Array<Express.Multer.File>,
  ) {
    const { password, ...rest } = createUserDto;

    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkUser) {
      return {
        success: false,
        message: 'Already has user by this email',
      };
    }

    if (files?.length) {
      rest[files[0].fieldname] = files[0].filename;
    }

    const hashedPass = await Lib.hashPass(password);

    const res = await this.prisma.user.create({
      data: {
        password: hashedPass,
        ...rest,
      },
    });

    const { id, name, email, photo } = res;

    const token = Lib.createToken(
      { id, name, email, photo },
      config.JWT_SECRET_USER,
      '24h',
    );

    return {
      success: true,
      message: 'Registation completed',
      data: {
        id,
        name,
        email,
        photo,
      },
      token,
    };
  }

  // login member
  public async loginMember(body: IloginBody) {
    const { email: userEmail, password } = body;
    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!checkUser) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const checkPass = await Lib.compare(password, checkUser.password);

    if (!checkPass) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const { id, name, email, photo } = checkUser;

    const token = Lib.createToken(
      { id, name, email, photo },
      config.JWT_SECRET_USER,
      '24h',
    );

    return {
      success: true,

      data: {
        id,
        name,
        email,
        photo,
      },
      token,
    };
  }
}
