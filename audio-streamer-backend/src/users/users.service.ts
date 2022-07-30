import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(user: CreateUserDto): Promise<UserDocument> {
        return this.userModel.create(user);
    }

    async getOne(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }

    async getMany(ids: string[]): Promise<UserDocument[]> {
        return this.userModel.find({
            _id: { $in: ids },
        });
    }

    async update(
        id: string,
        user: UpdateQuery<UserDocument>,
    ): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, user);
    }
}
