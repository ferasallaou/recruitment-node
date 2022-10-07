import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarbonCertificate, CarbonCertificateDocument } from './carbon.schema';

@Injectable()
export class CarbonService {
    constructor(@InjectModel(CarbonCertificate.name) private carbonCertificateModel: Model<CarbonCertificateDocument>) { }


    async listAll(): Promise<CarbonCertificate[]> {
        return this.carbonCertificateModel.find({ owner: { $exists: false } });
    }

    async findByOwner(userId: string): Promise<CarbonCertificate[]> {
        return await this.carbonCertificateModel.find({ owner: userId });
    }
}
