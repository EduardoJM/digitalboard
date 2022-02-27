import { Request, Response, NextFunction } from 'express';
import { getUser } from '../utils/auth';

export default async function IsAuthenticated(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization) {
        return response.status(401).json({ error: 'user-must-be-logged-in' });
    }
    const { authorization } = request.headers;
    if (!/^bearer /i.test(authorization)) {
        return response.status(401).json({ error: 'invalid-authorization-format' });
    }
    const [_, token] = authorization.split(' ');
    const user = await getUser(token);
    if (!user) {
        return response.status(401).json({ error: 'invalid-authorization-token' });
    }
    request.user = user;
    return next();
}
