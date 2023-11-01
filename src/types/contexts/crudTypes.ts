import { IUser } from "../Users";

export interface CrudContextData {
    getUsers: () => Promise<void>;
    createUser: (formData: IUser) => Promise<void>;
    updateUser: (id: string, formData: IUser) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    users: IUser[];
}