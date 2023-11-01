import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { api } from '../services/axios-config';
import { toast } from 'react-toastify';
import { CrudContextData } from '@/types/Context/crudTypes';
import { IUpdateUser, IUser } from '@/types/Users';


const CrudContext = createContext({} as CrudContextData)

interface CrudContextProps {
    children?: ReactNode
}

export const CrudProvider: React.FC<CrudContextProps> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([])


    const getUsers = useCallback(async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [])


    const createUser = useCallback(async (formData: IUser) => {
        try {
            await api.post('/users', formData)
            toast.success('Usuário criado com sucesso! ')
            await getUsers()
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [getUsers])


    const updateUser = useCallback(async (id: string, formData: IUpdateUser) => {
        try {
            await api.put(`/users/${id}`, formData)
            toast.success('Usuário editado com sucesso! ')
            await getUsers()
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [getUsers])


    const deleteUser = useCallback(async (id: string) => {
        try {
            await api.delete(`/users/${id}`)
            toast.success('Usuário excluído com sucesso! ')
            await getUsers()
        } catch (error) {
            toast.error(`Oops, ocorreu um erro. Tente novamente! `, {});
        }
    }, [getUsers])


    return (
        <CrudContext.Provider value={{
            getUsers,
            createUser,
            updateUser,
            deleteUser,
            users,
        }}>
            {children}
        </CrudContext.Provider>
    )
}


export const useCrud = (): CrudContextData => useContext(CrudContext)