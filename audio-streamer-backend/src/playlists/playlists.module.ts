import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { Playlist, PlaylistSchema } from './schemas/playlists.schema';

@Module({
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
    imports: [
        MongooseModule.forFeature([
            { name: Playlist.name, schema: PlaylistSchema },
        ]),
    ],
    exports: [PlaylistsService],
})
export class PlaylistsModule {}
