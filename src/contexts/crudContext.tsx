import React, { ReactNode, createContext, useContext } from 'react';
import { CrudContextData } from '../types/contexts/crudTypes';


const CrudContext = createContext({} as CrudContextData)

interface CrudContextProps {
    children?: ReactNode
}

export const CrudProvider: React.FC<CrudContextProps> = ({ children }) => {
    return (
        <CrudContext.Provider value={{}}>
            {children}
        </CrudContext.Provider>
    )
}


export const useCrud = (): CrudContextData => useContext(CrudContext)