import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { deleteCreative } from 'services/creative.services'
import Image from 'next/image'
import useCreative from 'hooks/useCreative'
import Link from 'next/link'
import { markdownToHtml } from 'utils/markdownToHtml'

const CreativeId = () => {
  const router = useRouter()
  const { id } = router.query
  const { isLoading, creative } = useCreative(id as string)
  const { data: session } = useSession()
  const [isOwn, setIsOwn] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    if (session?.user) {
      setIsOwn(session.user.id === creative?.author.id)
    }

    if (creative?.content) {
      setContent(markdownToHtml(creative.content || ''))
    }
  }, [session, creative])

  const handleClickDelete = async () => {
    await deleteCreative(creative?.id || '')
    router.push('/creative')
  }

  return (
    <div className="w-full max-w-4xl px-2 mx-auto mt-10">
      <h1 className="text-3xl md:text-5xl font-semibold">{creative?.title}</h1>

      <div className="mt-2 md:w-40">
        <div className="flex items-center p-4 dark:bg-indigo-800 bg-indigo-200 rounded-lg shadow-xs">
          <div>
            <p className=" text-xs font-medium ml-2 ">
              {creative?.Category.name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="inline-flex items-center gap-2">
          <Image
            src={creative?.author.image || '/img/amarillo.jpg'}
            alt={`Foto de ${creative?.author.name}`}
            width={32}
            height={32}
            loading="lazy"
            className="rounded-full"
          />
          <Link href={`/profile/${creative?.author.id}`}>
            <a className="text-sm">
              <span className="font-semibold">{creative?.author.name}</span>
            </a>
          </Link>
        </div>
        <p>
          {isLoading
            ? 'Cargando fecha...'
            : `🗓 ${new Date(creative?.createdAt || '').toLocaleDateString()}`}
        </p>
        {isOwn && (
          <button
            onClick={handleClickDelete}
            className="mt-5 w-full bg-red-700 dark:bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar post 🗑
          </button>
        )}
      </div>

      <div className="prose max-w-none lg:prose-base prose-sm dark:prose-invert prose-red mt-16">
        <div dangerouslySetInnerHTML={{ __html: content || '' }}></div>
      </div>
    </div>
  )
}

export default CreativeId
