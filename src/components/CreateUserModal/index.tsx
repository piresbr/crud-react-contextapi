import React from 'react';
import { IUser, UsersModalProps } from '../../types/users';
import { XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCrud } from '../../contexts/crudContext';
import { toast } from 'react-toastify';

interface CreateUserModalProps extends UsersModalProps {
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
    closeModal,
    isModalOpen,
}) => {
    const { createUser, getUsers } = useCrud()
    const { register, handleSubmit } = useForm<IUser>()


    const onSubmit = handleSubmit(async (dataForm) => {
        try {

            const date = new Date()
            const dateIso = date.toISOString()


            const userData: IUser = {
                nome: dataForm.nome,
                avatar: dataForm.avatar,
                dh_registro: `${dateIso}`
            }

            await createUser(userData)
            closeModal()

        } catch (error) {
            toast.error(`Ops, aconteceu algum erro inesperado. Tente novamente mais tarde! `, {});
        }
    })


    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
            <div className="flex items-center relative w-full max-w-2xl mx-auto h-full">
                <div className="relative w-full rounded-lg shadow bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                            Create User
                        </h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-100/20 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:text-gray-800">
                            <XCircle />
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="w-full p-6 space-y-6 text-white">
                        <input type="text" {...register('nome')} placeholder="Nome: " name="nome" className='w-full py-1 px-3 rounded-md bg-transparent border border-gray-200/50 focus:border-blue-500 focus:outline-none transition-colors' />
                        <input type="text" {...register('avatar')} placeholder="Link do avatar: " name="avatar" className='w-full py-1 px-3 rounded-md bg-transparent border border-gray-200/50 focus:border-blue-500 focus:outline-none transition-colors' />

                        <div className="flex items-center justify-end py-6 space-x-2 border-t rounded-b border-gray-600">
                            <button type="button" onClick={closeModal} className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">Cancel</button>
                            <button type="submit" className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUserModal;
