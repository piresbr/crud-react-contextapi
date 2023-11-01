export interface IUser {
    dh_registro: string
    nome: string
    avatar: string
    id: string
}

export interface UsersModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}
