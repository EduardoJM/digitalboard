import { IUser } from "~/modules/user/UserModel";

declare global {
   namespace Express {
      export interface Request {
         user?: IUser;
      }
   }
}
