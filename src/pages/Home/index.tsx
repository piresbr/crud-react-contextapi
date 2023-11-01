import React, { useEffect, useState } from "react"
import { useCrud } from "../../contexts/crudContext"
import DateAndHour from "../../components/ConvertDateHour"
import EditUserModal from "../../components/EditUserModal"
import DeleteUserModal from "../../components/DeleteUserModal"
import CreateUserModal from "../../components/CreateUserModal"
import { Pencil, X } from "lucide-react"

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
        document.body.classList.add("overflow-hidden");
    }

    const handleCreateUserModalClose = () => {
        setCreateModal(false)
        document.body.classList.remove("overflow-hidden");
    }

    const handleEditUserClick = (userId: string | undefined) => {
        if (!userId) {
            return
        }

        setEditModalUser(userId);
        document.body.classList.add("overflow-hidden");

    };

    const handleEditUserModalClose = () => {
        setEditModalUser(null);
        document.body.classList.remove("overflow-hidden");
    };

    const handleDeleteUserClick = (userId: string | undefined) => {
        if (!userId) {
            return
        }

        setDeleteModalUser(userId);
        document.body.classList.add("overflow-hidden");

    };

    const handleDeleteUserModalClose = () => {
        setDeleteModalUser(null);
        document.body.classList.remove("overflow-hidden");
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
                        <h1 className="text-white text-2xl font-semibold">User list</h1>
                        <button onClick={handleCreateUserClick} type="button" className="w-fit ml-auto mb-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700">Create User</button>
                        {createModalUser ? (
                            <CreateUserModal isModalOpen={createModalUser} closeModal={handleCreateUserModalClose} />
                        ) : (
                            undefined
                        )}
                    </div>
                    <div className="w-full h-[1px] bg-white/10"></div>
                    {users?.map((user) => (
                        <div key={user?.id} className="flex justify-between w-full gap-x-4 group text-white border-b-[1px] py-4 border-white/10">
                            <div className="flex gap-x-4">
                                {isValidAvatar(user?.avatar) ? (
                                    <img src={user?.avatar} alt={user?.nome} className="w-24 h-24 rounded-full object-cover border-4 border-white group-hover:border-green-500 transition-colors" />
                                ) : (
                                    <div className="flex items-center text-center w-24 h-24 rounded-full bg-gray-500 border-4 border-white group-hover:border-green-500 transition-colors">Sem imagem</div>
                                )}
                                <div className="flex flex-col gap-2 lg:self-center">
                                    <h2 className="text-lg">{user?.nome}</h2>
                                    <DateAndHour dateTime={user?.dh_registro} />
                                </div>
                            </div>
                            <div className="flex gap-2 h-fit lg:self-center">
                                <button onClick={() => handleEditUserClick(user.id)}
                                    className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium p-2 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">
                                    <Pencil size={16} />
                                </button>
                                <button onClick={() => handleDeleteUserClick(user.id)}
                                    className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium p-2 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600">
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
