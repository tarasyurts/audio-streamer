import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlists.schema';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectModel(Playlist.name)
        private playlistModel: Model<PlaylistDocument>,
    ) {}

    // ideally some system should be adding playlists
    async create(playlist: Playlist) {
        return this.playlistModel.create(playlist);
    }

    async getOne(id: string) {
        return this.playlistModel.findById(id);
    }

    async getPlaylists(userId: string) {
        const playlists = this.playlistModel.find();
        // create personal playlists for userId
        userId;
        return playlists;
    }
}
