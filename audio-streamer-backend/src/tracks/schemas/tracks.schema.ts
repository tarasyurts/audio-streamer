import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Album } from 'src/albums/schemas/albums.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    title: string;

    @Prop()
    lyrics: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Album.name })
    album: string;

    @Prop()
    listens: number;

    @Prop()
    likes: number;

    @Prop()
    audioPath: string;

    @Prop()
    datePublished: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
