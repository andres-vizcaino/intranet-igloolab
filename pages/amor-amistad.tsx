
import Image from 'next/image'
import useUser from "hooks/useUser";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { NextApplicationPage } from "./_app";
import { FormEvent } from 'react';
import axios from 'axios';

const AmorAmistadPage: NextApplicationPage = () => {
    const { data } = useSession()
    const { isLoading, user } = useUser(data ? data?.user.id : '0')
    const { data: love } = useSWR(`/api/amoramistad/${data ? data?.user.id : '0'}`)
    const { data: me, mutate } = useSWR(`/api/amoramistad/me/${data ? data?.user.id : '0'}`)


    const isParticipant = user?.profile?.amoramistad



    if (isLoading) return <>Estamos cargando...</>
    if (!isParticipant) return <>Hola, ya no hay mas oportunidades para participar, regresa el otro año.</>

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { message } = event.target as typeof event.target & {
            message: { value: string };
        };

        await axios.post(`/api/amoramistad/me/${data ? data?.user.id : '0'}`, {
            message: message.value
        }).finally(() => {
            mutate()
        })
    }

    return (<section className="grid place-content-center min-h-full text-center place-items-center">
        <h1 className="text-3xl">Hola, {user?.name}</h1>
        <h2 className="text-xl">El amor y la amistad se apoderó de igloolab, tu amigo secreto es:</h2>


        <div className="mt-10">
            <Image
                src={love.user.image}
                alt="Amigo secreto"
                width={150}
                height={150}
                className="rounded-full border-4 bg-slate-700 dark:bg-slate-50"
            />
            <h2 className='mt-4 text-2xl font-bold'>{love.user.name}</h2>
        </div>

        {me.message !== "" || me.message.length > 10 ? <p className='mt-5'>Tu amigo secreo ya conoce tus gustos!!</p> : <><p className='mt-5'>Tu amigo secreto seguramente no sabe que regalarte... ¡¿Por qué no le dejas un mensajito para darle ideas de tus gustos y disgustos?!... pero no reveles tu identidad.</p>
            <form onSubmit={handlerSubmit} className="mt-3">
                <textarea className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
                    placeholder="Escribe aqui tu estado" name="message" id="" cols={30} rows={10}></textarea>
                <button type='submit' className="mt-4 max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar tu mensaje</button>
            </form></>
        }


        {love.message !== "" ? <><h3 className='font-bold text-2xl mt-10'>Este mensaje te lo envio tu amigo secreto:</h3>
            <p>{love.message}</p></> : <h3 className='font-bold text-2xl mt-10'>Tu amigo secreto aún no te manda mensajito...</h3>}


    </section>)
}

AmorAmistadPage.requireAuth = true

export default AmorAmistadPage