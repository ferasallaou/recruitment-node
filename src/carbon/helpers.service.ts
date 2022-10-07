import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarbonCertificateDocument, CarbonCertificate } from './carbon.schema'
import { faker } from '@faker-js/faker';
import { CertificateStatus } from './carbon.model';
import { HelpersService as userHelperService } from 'src/user/helpers.service';


@Injectable()
export class HelpersService {
    constructor(
        @InjectModel(CarbonCertificate.name) private carbonCertificates: Model<CarbonCertificateDocument>,
        private userService: userHelperService
    ) { }


    async seed() {

        const isSeeded = await this.carbonCertificates.countDocuments()
        if (isSeeded > 0) return

        const certificatesArray = []
        const certicationStatusArray = Object.values(CertificateStatus)

        const getUsers = await this.userService.getRandom()

        // TODO: Use a seeder module!
        for (let i = 0; i < 100; i++) {
            let getRandomUser = i % 20 === 0 ? getUsers.pop() : ''
            certificatesArray.push(new this.carbonCertificates({
                country: faker.address.country(),
                status: certicationStatusArray[Math.floor(Math.random() * 3)],
                owner: i % 20 === 0 ? getRandomUser : undefined
            }))
        }

        return this.carbonCertificates.create(certificatesArray)
    }

}
