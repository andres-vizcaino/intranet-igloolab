import axios from "axios";
import HeartIcon from "components/HeartIcon";
import useUser from "hooks/useUser";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { NextApplicationPage } from "./_app";

const AmorAmistadPage: NextApplicationPage = () => {
    const { data } = useSession()
    const { isLoading, user, mutate } = useUser(data ? data?.user.id : '0')
    const [loading, setLoanding] = useState(false)

    const isParticipant = user?.profile?.amoramistad

    const handlerClick = async () => {
        setLoanding(true)
        await axios.post('/api/users/updateProfile', {
            amoramistad: true, idUser: data?.user.id
        }).finally(() => { mutate(); setLoanding(false); })
    }

    if (isLoading) return <>Estamos cargando...</>

    return (<section className="grid place-content-center min-h-full text-center place-items-center">
        <h1 className="text-3xl">Hola, {user?.name}</h1>
        <h2 className="text-xl">El amor y la amistad se apoderó de igloolab, ¿Quieres participar?</h2>
        <h3 className="text-igloolab font-bold underline">Dale click al corazón para participar</h3>


        {loading && (<span>Agregando tu participación...</span>)}


        <button onClick={!isParticipant ? handlerClick : undefined}><HeartIcon classNames={`w-40 h-40 fill-igloolab mt-10 ${isParticipant && 'animate-bounce'}`} /></button>
        {isParticipant && (
            <h3>Ya estas participando... pronto podrás ver todas las activades que tenemos para tí</h3>)}
    </section>)
}

AmorAmistadPage.requireAuth = true

export default AmorAmistadPage