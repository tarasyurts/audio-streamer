import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Playlist } from 'src/playlists/schemas/playlists.schema';
import { User } from 'src/users/schemas/users.schema';

export type AlbumDocument = Album & mongoose.Document;

@Schema()
export class Album extends Playlist {
    @Prop()
    datePublished: Date;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: User.name })
    artists: User[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
