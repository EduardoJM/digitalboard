import request from 'supertest';
import app from '../app';
import User, { IUser } from '../modules/user/UserModel';
import { expectValidationError } from '../../test/assertions';

const firstName = 'John';
const lastName = 'Doe';
const password = '123456';

const testCreateUserValidationError = async (data: any) => {
    const response = await 
        request(app)
        .post('/users')
        .send(data);
    
    expectValidationError(response);
}

describe('User', () => {
    it('Should be create an new user and return it data with a token', async () => {
        const email = 'john.doe@gmail.com';
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

        const user = await User.findOne<IUser>({email});
        expect(user).not.toBeNull();
        expect(user).not.toBeUndefined();
        expect(user?.firstName).toEqual(firstName);
        expect(user?.lastName).toEqual(lastName);
        expect(user?.password).not.toEqual('');
    });

    it('Should be set email as lowercase', async () => {
        const email = 'exaMplE@gmail.com';
        const response = await 
            request(app)
            .post('/users')
            .send({firstName, lastName, email, password,});
        
        const data = JSON.parse(response.text);
        expect('user' in data);
        expect(data.user.email).toEqual('example@gmail.com');

        const user = await User.findOne<IUser>({email: 'example@gmail.com'});
        expect(user).not.toBeNull();
        expect(user).not.toBeUndefined();
    });

    it('Should not create two users with same email', async () => {
        const email = 'newuser@gmail.com';
        await 
            request(app)
            .post('/users')
            .send({firstName, lastName, email, password,});
        
        const response = await 
            request(app)
            .post('/users')
            .send({firstName, lastName, email, password,});
        
        expect(response.statusCode).toEqual(400);
        const data = JSON.parse(response.text);
        expect('error' in data).toBeTruthy();
    });

    it('Should return bad request error when email has white spaces or if it is not e-mail or if it is empty', async () => {
        testCreateUserValidationError({ firstName, lastName, email: ' user123@gmail.com', password });
        testCreateUserValidationError({ firstName, lastName, email: 'user123@gmail.com ', password });
        testCreateUserValidationError({ firstName, lastName, email: '', password });
        testCreateUserValidationError({ firstName, lastName, email: 'not-an-email', password });
        testCreateUserValidationError({ firstName, lastName, password });
    });

    it('Should return bad request error when firstName, lastName or password is empty', async () => {
        let email = 'user123@gmail.com';
        testCreateUserValidationError({ firstName: '', lastName, email, password });
        testCreateUserValidationError({ firstName, lastName: '', email, password });
        testCreateUserValidationError({ firstName, lastName, email, password: '' });
        testCreateUserValidationError({ lastName, email, password });
        testCreateUserValidationError({ firstName, email, password });
        testCreateUserValidationError({ firstName, lastName, email });
    });
});
