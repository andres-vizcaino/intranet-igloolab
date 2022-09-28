import CreateMandalaModal from "components/CreateMandala"
import { IMandala } from "models/Pet.model"
import Image from 'next/image'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { NextApplicationPage } from "pages/_app"
import { useEffect, useState } from "react"
import { deleteMandala } from "services/mandala.services"
import useSWR from "swr"
import { getUrlCloudnaryLowQuality } from "utils/getUrlCloudnaryLowQuality"
import LigthBoxImageMandala from "components/LigthBoxImageMandala"

const LaMejorMandala: NextApplicationPage = () => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [mandalaselected, setmandalaselected] = useState<IMandala>()
    const [isOpenLigthBox, setIsOpenLigthBox] = useState(false)
    const closeModal = () => setIsOpen(!isOpen)
    const closeLigthBox = () => setIsOpenLigthBox(!isOpenLigthBox)
    const { data: mandalas, error, mutate } = useSWR<IMandala[]>('/api/mandala')
    const [haveMandalaPublish, setHaveMandalaPublish] = useState<boolean | undefined>(false)

    const deletemandalaselect = async (id: string) => {
        await deleteMandala(id)
        mutate()
    }

    useEffect(() => {
        setHaveMandalaPublish(mandalas?.some(m => m.ownerId === session?.user.id))
    }, [mandalas, session])

    if (error) return <div>failed to load</div>
    if (!mandalas) return <div>loading...</div>

    return (
        <div className="text-center mt-5">
            <h1 className="text-2xl font-bold md:text-4xl">
                Mandalas <span className="text-red-500">igloolab</span> - Semana de la salud
            </h1>
            <h3 className="text-xl">Sube una foto de tu mandala 📸</h3>
            <h4 className="text-md">Habrá premios para los 3 mas votados</h4>
            {!haveMandalaPublish && <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded"
            >
                Subir foto
            </button>}

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                {mandalas.map((mandala, index) => (
                    <div
                        key={mandala.id}
                        className={`${index === 0 && 'sm:row-span-2	sm:col-span-2'}`}
                    >
                        <Image
                            src={getUrlCloudnaryLowQuality(mandala.photo)}
                            alt={mandala.name}
                            width="100%"
                            onClick={() => {
                                setmandalaselected(mandala)
                                closeLigthBox()
                            }}
                            height="100%"
                            layout="responsive"
                            className={`scale-75 ${index % 2 === 0
                                ? 'translate-x-4 skew-y-3'
                                : 'translate-x-4 -skew-y-3'
                                }  transform-gpu hover:scale-110`}
                            objectFit="cover"
                            unoptimized
                            loading="lazy"
                        />
                        <div className="flex gap-1 justify-center items-baseline">
                            <p
                                className={`${index === 0 ? 'text-3xl' : 'text-xl'} font-bold`}
                            >
                                {mandala.name}
                            </p>
                            {session?.user.id === mandala.owner.id && (
                                <button onClick={() => deletemandalaselect(mandala.id)}>❌</button>
                            )}
                        </div>

                        {session?.user.id === mandala.owner.id && (<div className="flex items-center justify-center gap-1">
                            <Image
                                src={mandala.owner.image}
                                alt={mandala.owner.name || ''}
                                width={20}
                                height={20}
                                className="rounded-full"
                            />
                            <Link href={`/profile/${mandala.owner.id}`}>
                                <a className={`${index === 0 ? 'text-base' : 'text-sm'}`}>
                                    {mandala.owner.name}
                                </a>
                            </Link>
                        </div>)}
                    </div>
                ))}
            </div>

            <LigthBoxImageMandala
                isOpen={isOpenLigthBox}
                closeModal={closeLigthBox}
                image={mandalaselected?.photo || ''}
                name={mandalaselected?.name || ''}
                likesBy={mandalaselected?.likesBy || []}
                idPet={mandalaselected?.id || ''}
            />
            <CreateMandalaModal isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

LaMejorMandala.requireAuth = true

export default LaMejorMandala