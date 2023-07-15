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

  // update profile
  public async updateProfile(req: Request, files: Array<Express.Multer.File>) {
    const { id } = req.params;
    return await this.prisma.$transaction(async (tx) => {
      if (files?.length) {
        req.body[files[0].fieldname] = files[0].filename;
      }

      const updateUserRes = await tx.user.update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
      });

      if (updateUserRes.id) {
        return {
          success: true,
          message: 'Successfully profile updated',
        };
      } else {
        return {
          success: false,
          message: 'Cannot profile update at this moment',
        };
      }
    });
  }
}
