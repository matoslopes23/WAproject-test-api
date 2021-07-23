import { IUser } from './IUser';

export interface IDevice {
  id: string;
  userId?: number;
  name: string;
  currentToken: string;
  notificationToken?: string;

  user?: IUser;
}
