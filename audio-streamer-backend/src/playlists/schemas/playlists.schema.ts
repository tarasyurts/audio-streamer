import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Track } from 'src/tracks/schemas/tracks.schema';

export type PlaylistDocument = Playlist & mongoose.Document;

@Schema()
export class Playlist {
    @Prop()
    title: string;

    @Prop()
    likes: number;

    @Prop()
    imagePath: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Track.name })
    tracks: Track[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
