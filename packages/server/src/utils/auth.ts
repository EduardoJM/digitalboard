import jwt from 'jsonwebtoken';
import User, { IUser } from '../modules/user/UserModel';
import config from '../config';

export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, config.JWT_SECRET);
};

export const getUser = async (authorization: string | null | undefined) => {
    if (!authorization) {
        return { user: null };
    }
    if (!/^bearer /i.test(authorization)) {
        return { user: null };
    }
    const [_, token] = authorization.split(' ');
    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
  
        const user = await User.findOne({ _id: (decodedToken as { id: string }).id });

        return {
            user,
        };
    } catch (err) {
        return { user: null };
    }
};  