import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { FilesService, FileType } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/albums.schema';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>,
        private userService: UsersService,
        private fileService: FilesService,
    ) {}

    async create(album: CreateAlbumDto, image): Promise<AlbumDocument> {
        const imagePath = await this.fileService.createFile(
            FileType.IMAGE,
            image,
        );

        const artists = await this.userService.getMany(album.artists);

        const createdAlbum = await this.albumModel.create({
            ...album,
            imagePath,
        });

        artists.forEach(async (artist) => {
            await this.userService.update(artist._id, {
                $push: { albums: createdAlbum._id },
            });
        });

        return createdAlbum;
    }

    async getOne(id: string): Promise<AlbumDocument> {
        return this.albumModel.findById(id);
    }

    async update(
        id: string,
        album: UpdateQuery<AlbumDocument>,
    ): Promise<AlbumDocument> {
        return await this.albumModel.findByIdAndUpdate(id, album);
    }

    async delete(id: string): Promise<void> {
        const album = await this.getOne(id);

        const artists = await this.userService.getMany(
            album.artists.map((_) => _ + ''),
        );

        artists.forEach(async (artist) => {
            await this.userService.update(artist._id, {
                $pull: { albums: album._id },
            });
        });

        // TODO: erase tracks of deleted album
        await this.albumModel.findByIdAndDelete(id);
    }
}
