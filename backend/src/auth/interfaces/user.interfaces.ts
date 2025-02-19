// user.interface.ts
import { Role } from '../enums/role.enum';

export interface IUser {  // Renamed to IUser to avoid conflict
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  facebookId?: string; 
  provider?: string; 
  phone?: string; 
  password?: string; 
  role: Role[];
}
