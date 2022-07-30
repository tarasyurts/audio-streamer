import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { AlbumsService } from 'src/albums/albums.service';
import { FilesService, FileType } from 'src/files/files.service';
import { PlaylistsService } from 'src/playlists/playlists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track, TrackDocument } from './schemas/tracks.schema';

@Injectable()
export class TracksService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private albumService: AlbumsService,
        private playlistService: PlaylistsService,
        private fileService: FilesService,
    ) {}

    async create(track: CreateTrackDto, audio): Promise<TrackDocument> {
        const audioPath = await this.fileService.createFile(
            FileType.AUDIO,
            audio,
        );

        const trackCreated = await this.trackModel.create({
            ...track,
            album: track.albumId,
            audioPath,
        });

        await this.albumService.update(track.albumId, {
            $push: { tracks: trackCreated._id },
        }); // TODO: check whether _.id or not

        return trackCreated;
    }

    async getTracks(
        albumId: string | undefined,
        playlistId: string | undefined,
    ): Promise<Track[]> {
        if (albumId) {
            const album = await this.albumService.getOne(albumId);
            return album.tracks;
        }
        if (playlistId) {
            const playlist = await this.playlistService.getOne(playlistId);
            return playlist.tracks;
        }
        return [];
    }

    // async getAlbumTracks(albumId: string): Promise<Track[]> {
    //     const album = await this.albumService.getOne(albumId);
    //     return album.tracks;
    // }

    async getOne(id: string): Promise<TrackDocument> {
        return this.trackModel.findById(id);
    }

    async update(
        id: string,
        track: UpdateQuery<TrackDocument>,
    ): Promise<Track> {
        return await this.trackModel.findByIdAndUpdate(id, track);
    }

    async delete(id: string): Promise<void> {
        const track = await this.getOne(id);

        await this.albumService.update(track.album, {
            $pull: { tracks: track._id },
        });
        // TODO: check whether not to change a type to string
        // TODO: check whether _.id or not

        await this.trackModel.findByIdAndDelete(id);
    }
}
