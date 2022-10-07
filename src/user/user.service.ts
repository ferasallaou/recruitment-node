import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserData } from './user.dto';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne({ email, password }: UserData) {
        const user = await this.userModel.findOne({ email })
        if (!user) throw new NotFoundException('Wrong Credentials!')

        const passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) throw new NotFoundException('Wrong Credentials!')

        return this.generateToken(user._id)
    }

    async generateToken(userId: ObjectId) {
        return { accessToken: jwt.sign({ userId }, process.env.SECRET ?? '') }
    }

}
