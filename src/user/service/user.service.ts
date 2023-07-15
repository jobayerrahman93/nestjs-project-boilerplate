import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // get profile
  public async getProfile(req: Request) {
    const { id } = req['user'];
    const data = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        photo: true,
      },
    });

    return {
      success: true,
      data,
    };
  }
}
