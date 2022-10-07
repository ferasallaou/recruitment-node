import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { response } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNmZTdlZmY4OGJkNzg2NmYxZTAzMjAiLCJpYXQiOjE2NjUxMzM3MzV9.n8RtVkttg96JNkeTKJnPBeBs8_joQO9BkMf_moFpiu0'
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Carbon Certificates Controller', () => {
    it('should return 403 when no token is provieded', () => {
      return request(app.getHttpServer())
        .get('/carbon')
        .expect(403)
    });

    it('should return an Array of Carbon Certificates', async () => {
      const response = await request(app.getHttpServer())
        .get('/carbon')
        .set('Authorization', TOKEN)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
    });

    it('return an Array of Carbon Certificates which belongs to the user', async () => {
      const response = await request(app.getHttpServer())
        .get('/carbon')
        .set('Authorization', TOKEN)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
    });

    it('does not allow changing ownership of a certificate unless it belongs to the user', async () => {
      const getAllCertificates = await request(app.getHttpServer())
        .get('/carbon')
        .set('Authorization', TOKEN)
        .expect(200)

      const newUserId = '633fff107b9b8d2c9ee58adc'

      if (getAllCertificates.body.length > 0) {
        const getOneCertificate = getAllCertificates.body[0]
        await request(app.getHttpServer())
          .patch(`/carbon/transfer/${getOneCertificate._id}/${newUserId}`)
          .set('Authorization', TOKEN)
          .expect(404)
      }
    });


    it('allow changing ownership of a certificate unless it belongs to the user', async () => {
      const getUserCertificates = await request(app.getHttpServer())
        .get('/carbon/me')
        .set('Authorization', TOKEN)
        .expect(200)

      const newUserId = '633fff107b9b8d2c9ee58adc'

      if (getUserCertificates.body.length > 0) {
        const getOneCertificate = getUserCertificates.body[0]
        await request(app.getHttpServer())
          .patch(`/carbon/transfer/${getOneCertificate._id}/${newUserId}`)
          .set('Authorization', TOKEN)
          .expect(200)
      }
    });

  });
});
