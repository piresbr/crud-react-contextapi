import React, { useEffect, useState } from "react"
import { useCrud } from "../../contexts/crudContext"
import DateAndHour from "../../components/ConvertDateHour"
import EditUserModal from "../../components/EditUserModal"
import { Pencil, X } from "lucide-react"
import DeleteUserModal from "../../components/DeleteUserModal"
import CreateUserModal from "../../components/CreateUserModal"

export default function HomePage() {
    const { users, getUsers } = useCrud();
    const [createModalUser, setCreateModal] = useState<boolean>(false);
    const [editModalUser, setEditModalUser] = useState<string | null>(null);
    const [deleteModalUser, setDeleteModalUser] = useState<string | null>(null);

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    const handleCreateUserClick = () => {
        setCreateModal(true)
    }

    const handleCreateUserModalClose = () => {
        setCreateModal(false)
    }

    const handleEditUserClick = (userId: string | undefined) => {
        if (!userId) {
            return
        }

        setEditModalUser(userId);

    };

    const handleEditUserModalClose = () => {
        setEditModalUser(null);
    };

    const handleDeleteUserClick = (userId: string | undefined) => {
        if (!userId) {
            return
        }

        setDeleteModalUser(userId);

    };

    const handleDeleteUserModalClose = () => {
        setDeleteModalUser(null);
    };


    function isValidAvatar(avatarURL: string): boolean {
        try {
            new URL(avatarURL);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <>
            <section className="flex flex-col min-h-screen bg-gray-950 p-6">
                <div className="max-w-2xl mx-auto w-full flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-xl">User list</h1>
                        <button onClick={handleCreateUserClick} type="button" className="w-fit ml-auto mb-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700">Create User</button>
                        {createModalUser ? (
                            <CreateUserModal isModalOpen={createModalUser} closeModal={handleCreateUserModalClose} />
                        ) : (
                            undefined
                        )}
                    </div>
                    <div className="w-full h-[1px] bg-white/10"></div>
                    {users?.map((user) => (
                        <div key={user?.id} className="flex justify-between w-full group text-white border-b-[1px] py-4 border-white/10">
                            <div className="flex gap-x-6">
                                {isValidAvatar(user?.avatar) ? (
                                    <img src={user?.avatar} alt={user?.nome} className="w-24 h-24 rounded-full object-cover border-4 border-white group-hover:border-green-500 transition-colors" />
                                ) : (
                                    <div className="flex items-center text-center w-24 h-24 rounded-full bg-gray-500 border-4 border-white group-hover:border-green-500 transition-colors">Sem imagem</div>
                                )}
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-light">{user?.nome}</h2>
                                    <DateAndHour dateTime={user?.dh_registro} />
                                </div>
                            </div>
                            <div className="flex gap-2 h-fit">
                                <button onClick={() => handleEditUserClick(user.id)}
                                    className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium p-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">
                                    <Pencil size={16} />
                                </button>
                                <button onClick={() => handleDeleteUserClick(user.id)}
                                    className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium p-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">
                                    <X size={16} />
                                </button>
                                {user.id === editModalUser && (
                                    <EditUserModal
                                        user={user}
                                        isModalOpen={true}
                                        closeModal={handleEditUserModalClose}
                                    />
                                )}

                                {user.id === deleteModalUser && (
                                    <DeleteUserModal
                                        user={user}
                                        isModalOpen={true}
                                        closeModal={handleDeleteUserModalClose}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
