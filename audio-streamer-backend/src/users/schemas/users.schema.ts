import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Album } from 'src/albums/schemas/albums.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    imagePath: string;

    @Prop()
    isBlocked: boolean;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Album.name })
    albums: Album[];
}

export const UserSchema = SchemaFactory.createForClass(User);
