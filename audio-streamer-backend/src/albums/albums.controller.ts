import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    create(@Body() album: CreateAlbumDto, @UploadedFiles() files) {
        const { image } = files;
        return this.albumsService.create(album, image[0]);
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.albumsService.getOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() album: CreateAlbumDto) {
        return this.albumsService.update(id, album);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.albumsService.delete(id);
    }
}
