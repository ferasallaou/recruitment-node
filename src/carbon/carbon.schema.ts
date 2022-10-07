import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CertificateStatus } from './carbon.model';

export type CarbonCertificateDocument = CarbonCertificate & Document;

@Schema()
export class CarbonCertificate {
    @Prop()
    country: string;

    @Prop()
    status: CertificateStatus;

    @Prop({ required: false })
    owner: string;
}

export const CarbonCertificateSchema = SchemaFactory.createForClass(CarbonCertificate);