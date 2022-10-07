import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CertificateStatus } from './carbon.model';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type CarbonCertificateDocument = CarbonCertificate & Document;

@Schema()
export class CarbonCertificate {
    @Prop()
    country: string;

    @Prop()
    status: CertificateStatus;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;
}

export const CarbonCertificateSchema = SchemaFactory.createForClass(CarbonCertificate);