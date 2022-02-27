import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: false,
            default: '',
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            hidden: true,
            select: false,
        },
        enabled: {
            type: String,
            required: true,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    }
);

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    displayName?: string;
    email: string;
    password: string;
    authenticate: (plainTextPassword: string) => boolean;
    encryptPassword: (password: string) => string;
    createdAt: Date;
    updatedAt: Date;
}

UserSchema.pre<IUser>('save', function encryptPasswordHook(next) {
    if (this.isModified('password')) {
        this.password = this.encryptPassword(this.password);
    }

    return next();
});

UserSchema.methods = {
    authenticate(plainTextPassword: string) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    encryptPassword(password: string) {
        return bcrypt.hashSync(password, 8);
    },
};

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);

export default UserModel;
