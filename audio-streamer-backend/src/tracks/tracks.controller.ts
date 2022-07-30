import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    UseInterceptors,
    UploadedFiles,
    Put,
    BadRequestException,
    Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
    constructor(private trackService: TracksService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }]))
    create(@Body() track: CreateTrackDto, @UploadedFiles() files) {
        const { audio } = files;
        return this.trackService.create(track, audio[0]);
    }

    @Get()
    getTracks(
        @Query('albumId') albumId: string,
        @Query('playlistId') playlistId: string,
    ) {
        if (!albumId && !playlistId)
            throw new BadRequestException('Query param is not specified');

        return this.trackService.getTracks(albumId, playlistId);
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.trackService.getOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() track: UpdateTrackDto) {
        return this.trackService.update(id, track);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.trackService.delete(id);
    }
}
