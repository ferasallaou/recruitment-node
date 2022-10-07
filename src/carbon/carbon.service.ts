import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CertificateStatus } from './carbon.model';
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

    async transfer(certificateId: string, newUserId: string, ownerId: string): Promise<CarbonCertificate> {
        const predicate = { _id: certificateId, owner: ownerId }

        const findAndUpdate = await this.carbonCertificateModel.findOneAndUpdate(predicate, { owner: newUserId, status: CertificateStatus.TRANSFERRED })
        if (!findAndUpdate) throw new NotFoundException('Certificate Not Found Or Doesn\'t belong to you! ')

        return findAndUpdate

    }
}
