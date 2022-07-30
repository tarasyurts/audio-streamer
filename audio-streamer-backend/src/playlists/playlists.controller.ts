import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './schemas/playlists.schema';

@Controller('playlists')
export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) {}

    @Post()
    create(@Body() playlist: Playlist) {
        return this.playlistsService.create(playlist);
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.playlistsService.getOne(id);
    }

    // get logged in user id
    @Get()
    getPlaylists(userId: string) {
        return this.playlistsService.getPlaylists(userId);
    }
}
