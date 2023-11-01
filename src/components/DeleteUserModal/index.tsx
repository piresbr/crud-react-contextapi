import React, { useEffect, useRef } from 'react';
import { IUpdateUser, IUser, UsersModalProps } from '../../types/Users';
import { XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCrud } from '../../contexts/crudContext';
import { toast } from 'react-toastify';

interface DeleteUserModalProps extends UsersModalProps {
    user: IUser;
}


const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ closeModal, isModalOpen, user, }) => {
    const { deleteUser } = useCrud()
    const { handleSubmit } = useForm<IUpdateUser>()


    const onSubmit = handleSubmit(async () => {
        try {

            if (!user.id) {
                return
            }

            await deleteUser(user.id)
            closeModal()

        } catch (err) {
            toast.error(`Ops, aconteceu algum erro inesperado. Tente novamente mais tarde! `, {});
        }
    })

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
            <div className="flex items-center relative w-full max-w-2xl mx-auto h-full">
                <div className="relative w-full rounded-lg shadow bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                            Delete {user.nome}
                        </h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-100/20 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:text-gray-800">
                            <XCircle />
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="w-full p-6 space-y-6">
                        <h4>Tem certeza que deseja deletar o usuário {user?.nome}?</h4>
                        <h5 className='text-red-200'>OBS: depois da exclusão, não será possível reverter.</h5>
                        <div className="flex items-center justify-end py-6 space-x-2 border-t rounded-b border-gray-600">
                            <button type="button" onClick={closeModal} className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">Cancel</button>
                            <button type="submit" className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserModal;
