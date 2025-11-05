import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileController } from './controllers/file.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            const category = file.mimetype.split('/')[0];
            const path = `./public/files/${category}`;
            cb(null, path);
          },
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueName}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
        fileFilter: (req, file, cb): void => {
          const allowedMimes = {
            image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            video: ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'],
            audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'],
            json: ['application/json'],
          };

          const isValidType = Object.values(allowedMimes).flat().includes(file.mimetype);

          if (isValidType) {
            cb(null, true);
          } else {
            cb(new BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`), false);
          }
        },
      }),
    }),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        return [
          {
            rootPath: join(__dirname, '..', '..', 'public', 'files'),
            serveRoot: '/files',
          },
        ];
      },
    }),
  ],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
