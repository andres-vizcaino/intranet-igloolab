
import Image from 'next/image'
import useUser from "hooks/useUser";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { NextApplicationPage } from "./_app";

const AmorAmistadPage: NextApplicationPage = () => {
    const { data } = useSession()
    const { isLoading, user } = useUser(data ? data?.user.id : '0')
    const { data: love } = useSWR(`/api/amoramistad/${data ? data?.user.id : '0'}`)


    const isParticipant = user?.profile?.amoramistad



    if (isLoading) return <>Estamos cargando...</>
    if (!isParticipant) return <>Hola, ya no hay mas oportunidades para participar, regresa el otro año.</>

    return (<section className="grid place-content-center min-h-full text-center place-items-center">
        <h1 className="text-3xl">Hola, {user?.name}</h1>
        <h2 className="text-xl">El amor y la amistad se apoderó de igloolab, tu amigo secreto es:</h2>


        <div className="mt-10">
            <Image
                src={love.image}
                alt="Amigo secreto"
                width={150}
                height={150}
                className="rounded-full border-4 bg-slate-700 dark:bg-slate-50"
            />
            <h2 className='mt-4 text-2xl font-bold'>{love.name}</h2>
        </div>

        <p className='mt-5'>Pronto podrás darle pistas a tu amigo secreto, para que te de el regalo perfecto.</p>

    </section>)
}

AmorAmistadPage.requireAuth = true

export default AmorAmistadPage