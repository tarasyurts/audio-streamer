import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album, AlbumSchema } from './schemas/albums.schema';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [AlbumsController],
    providers: [AlbumsService],
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        UsersModule,
        FilesModule,
    ],
    exports: [AlbumsService],
})
export class AlbumsModule {}
