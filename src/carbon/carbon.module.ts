import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CarbonController } from './carbon.controller';
import { CarbonCertificate, CarbonCertificateSchema } from './carbon.schema';
import { CarbonService } from './carbon.service';
import { HelpersService } from './helpers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CarbonCertificate.name, schema: CarbonCertificateSchema }]), UserModule],
  controllers: [CarbonController],
  providers: [CarbonService, HelpersService],
  exports: [HelpersService]
})
export class CarbonModule { }
