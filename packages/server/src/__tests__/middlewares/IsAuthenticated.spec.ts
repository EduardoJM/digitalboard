import express from 'express';
import request from 'supertest';
import User from '../../modules/user/UserModel';
import IsAuthenticated from '../../middlewares/IsAuthenticated';
import { generateToken } from '../../utils/auth';

const password = '123456';
const firstName = 'John';
const lastName = 'Doe';

const app = express();
app.get('/', IsAuthenticated, (_, res) => res.send());

describe('IsAuthenticated', () => {
    it('Should return unauthenticated if authorization header is not sent', async () => {
        const response = await
            request(app)
            .get('/')
            .send();
        
        expect(response.statusCode).toBe(401);
        const data = JSON.parse(response.text);
        expect('error' in data).toBeTruthy();
    });
    
    it('Should return unauthenticated if authorization header is in incorrect format', async () => {
        const response = await
            request(app)
            .get('/')
            .set('Authorization', 'Not bearer')
            .send();
        
        expect(response.statusCode).toBe(401);
        const data = JSON.parse(response.text);
        expect('error' in data).toBeTruthy();
    });

    it('Should return unauthenticated if authorization header is in correctly format and token is wrong', async () => {
        const response = await
            request(app)
            .get('/')
            .set('Authorization', 'bearer 123456')
            .send();
        
        expect(response.statusCode).toBe(401);
        const data = JSON.parse(response.text);
        expect('error' in data).toBeTruthy();
    });

    it('Should return 200 if authorization header is correctly set', async () => {
        const user = await new User({ email: 'middleware.test1@gmail.com', firstName, lastName, password }).save();
        const token = generateToken(user);

        const response = await
            request(app)
            .get('/')
            .set('Authorization', `bearer ${token}`)
            .send();
        
        expect(response.statusCode).toBe(200);
    });
});