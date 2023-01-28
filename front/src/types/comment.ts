import { IUser } from "./user";

export interface IComments {
    user: IUser,
    comment: string,
    dateCommented: string,
    rating: number
  }