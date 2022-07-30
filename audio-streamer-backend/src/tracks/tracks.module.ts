import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AlbumsModule } from 'src/albums/albums.module';
import { Track, TrackSchema } from './schemas/tracks.schema';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { FilesModule } from 'src/files/files.module';

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        AlbumsModule,
        PlaylistsModule,
        FilesModule,
    ],
})
export class TracksModule {}
