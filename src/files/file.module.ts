import { BadRequestException, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import config from 'src/config/configuration';
import { FileController } from './controllers/file.controller';
import { FileRandom } from './entities/fileRandom.entity';
import { FileService } from './services/file.service';

const allowedMimes = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/x-matroska', 'video/avi', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/wave', 'audio/ogg', 'audio/x-wav'],
  json: ['application/json'],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRandom]),
    MulterModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            const category = file.mimetype.split('/')[0];
            const path = `./public/files/${category}`;

            if (!existsSync(path)) {
              mkdirSync(path, { recursive: true });
            }
            cb(null, path);
          },
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueName}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: configService.file.maxSize }, // 100 MB
        fileFilter: (req, file, cb): void => {
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
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
