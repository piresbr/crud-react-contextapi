import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { CrudContextData } from '../types/Contexts/crudTypes';
import { IUser } from '../types/Users';
import { api } from '../services/axios-config';
import { toast } from 'react-toastify';


const CrudContext = createContext({} as CrudContextData)

interface CrudContextProps {
    children?: ReactNode
}

export const CrudProvider: React.FC<CrudContextProps> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([])
    // const [userId, setUserId] = useState<IUser>()


    const getUsers = useCallback(async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [])

    const createUser = useCallback(async () => {
        try {
            const response = await api.post('/users')
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [])



    return (
        <CrudContext.Provider value={{
            getUsers,
            createUser,
            // updateUser,
            // getUserById,
            // deleteUser,
            users,
            // userId,
        }}>
            {children}
        </CrudContext.Provider>
    )
}


export const useCrud = (): CrudContextData => useContext(CrudContext)