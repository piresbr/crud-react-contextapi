import { IUser } from "../Users";

export interface CrudContextData {
    getUsers: () => Promise<void>;
    createUser: (formData: IUser) => Promise<void>;
    // updateUser: (id: number, formData: IUser) => Promise<void>;
    // getUserById: (id: string) => Promise<void>;
    // deleteUser: (id: string) => Promise<void>;
    users: IUser[];
    // userId: IUser | undefined;
}