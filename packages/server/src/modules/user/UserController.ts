import { Request, Response } from 'express';
import User, {IUser} from './UserModel';
import { generateToken } from '../../utils/auth';

interface UserRegisterBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default class UserController {
    async create(request: Request<any, any, UserRegisterBody>, response: Response) {
        const {firstName, lastName, email, password} = request.body;

        const hasUser = (await User.countDocuments({ email: email.trim().toLowerCase() })) > 0;
        if (hasUser) {
            return response.status(400).json({ error: 'email-already-used' });
        }

        await new User({
            email: email.trim().toLowerCase(),
            firstName,
            lastName,
            password,
        }).save();
        
        const user = await User.findOne<IUser>({ email: email.trim().toLowerCase() });
        if (!user) {
            return response.status(500).json({ error: 'saving-error' });
        }

        const token = generateToken(user);
        return response.status(201).json({ token, user });
    }
}
