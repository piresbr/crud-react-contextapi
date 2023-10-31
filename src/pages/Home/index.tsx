import React, { useEffect } from "react"
import { useCrud } from "../../contexts/crudContext"
import DateAndHour from "../../components/ConvertDateHour"

export default function HomePage() {
    const { users, getUsers } = useCrud()


    useEffect(() => {
        getUsers()
    }, [getUsers])


    function isValidAvatar(avatarURL: string): boolean {
        try {
            new URL(avatarURL);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <section className="flex min-h-screen bg-gray-950 p-6">
            <div className="max-w-2xl mx-auto w-full flex flex-col">
                {users?.map((user) => (
                    <div key={user?.id} className="flex justify-between w-full group text-white border-b-[1px] py-4 border-white/10">
                        <div className="flex gap-x-6">
                            {isValidAvatar(user.avatar) ? (
                                <img src={user.avatar} alt={user.nome} className="w-24 h-24 rounded-full object-cover border-4 border-white group-hover:border-green-500 transition-colors" />
                            ) : (
                                <div className="flex items-center text-center w-24 h-24 rounded-full bg-gray-500 border-4 border-white group-hover:border-green-500 transition-colors">Sem imagem</div>
                            )}
                            <div className="flex flex-col">
                                <h2 className="text-xl font-light">{user.nome}</h2>
                                <DateAndHour dateTime={user.dh_registro} />
                            </div>
                        </div>
                        <div>
                            actions
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}