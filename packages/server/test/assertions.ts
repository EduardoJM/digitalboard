import { Response } from 'supertest';

export function expectValidationError(response: Response) {
    expect(response.statusCode).toEqual(400);
    const data = JSON.parse(response.text);
    expect('error' in data);
    expect('fields' in data);
}