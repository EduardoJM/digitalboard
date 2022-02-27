import app from '../app';
import request from 'supertest';

describe('User', () => {
    it('Should be create an new user and return it data with a token', async () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'john.doe@gmail.com';
        const password = '123456';
        const response = await 
            request(app)
            .post('/users')
            .send({firstName, lastName, email, password,});
        
        expect(response.statusCode).toEqual(201);
        
        const data = JSON.parse(response.text);
        expect('token' in data).toBeTruthy();
        expect('user' in data).toBeTruthy();
        expect(data.user.firstName).toEqual(firstName);
        expect(data.user.lastName).toEqual(lastName);
        expect(data.user.email).toEqual(email);

        expect('password' in data.user).toBeFalsy();
        expect(data.user.enabled).toBeTruthy();
    });

    it('Should be set email as lowercase', async () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'exaMplE@gmail.com';
        const password = '123456';
        const response = await 
            request(app)
            .post('/users')
            .send({firstName, lastName, email, password,});
        
        const data = JSON.parse(response.text);
        expect('user' in data);
        expect(data.user.email).toEqual('example@gmail.com');
    });
});
