import app from './app';
import request from 'supertest';

describe('test', () => {
    it('must run', async () => {
        const response = await request(app).get('/').send();
        
        expect(response.statusCode).toEqual(404);
    });
});
