import { IUnitOfStudyInfo } from "./unit-of-study";
import { IUser } from "./user";

export interface IStudyResource {
    id: string,
    user: IUser,
    unitOfStudy: IUnitOfStudyInfo,
    title: string,
    dateUploaded: string,
  }