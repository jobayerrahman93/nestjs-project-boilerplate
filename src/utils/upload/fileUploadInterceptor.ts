import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { allowed_file_types } from '../miscellaneous/constants';
import { HttpException } from '@nestjs/common';
import { error } from 'console';

export const FileUploadInterceptor = (subFolder: string) => {
  return AnyFilesInterceptor({
    storage: diskStorage({
      destination: `./uploads/${subFolder}`,
      filename: (req, file, cb) => {
        console.log({ file });
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname);
        cb(null, uniqueName);
      },
    }),
    fileFilter: (_req, file, cb) => {
      console.log(file.mimetype);
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        console.log('Invalid file type for ' + file.fieldname);
        cb(
          new HttpException('Invalid file type for ' + file.fieldname, 400),
          false,
        );
      }
    },
  });
};
