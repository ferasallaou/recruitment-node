import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private catModel: Model<UserDocument>) { }


    async seed() {
        const usersArray = []

        // Just for dev purpose
        const PASSWORD = faker.random.alphaNumeric(10)
        console.log(`>>>> You can use this password ${PASSWORD} to login with all users :) `)

        // TODO: Use a seeder module!
        for (let i = 0; i < 10; i++) {
            usersArray.push(new this.catModel({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: await bcrypt.hash(faker.random.alphaNumeric(), 10)
            }))
        }

        return this.catModel.create(usersArray)
    }
}
