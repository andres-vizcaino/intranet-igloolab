import usePost from 'hooks/usePost'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import MarkdownIt from 'markdown-it'
import prisma from 'lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { deletePost } from 'services/post.services'

type Props = {
  postServer: {
    title: string
    author: {
      image: string | null
      name: string | null
    }
  } | null
}

const PostSlug = ({
  postServer: { title, author, content },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { slug } = router.query
  const { post, isLoading } = usePost(slug as string)
  const { data: session } = useSession()
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setIsOwn(session.user.id === author.id)
    }
  }, [session, author])

  const md = new MarkdownIt()

  const handleClickDelete = async () => {
    await deletePost(post?.slug || '')
    router.push('/blog')
  }

  return (
    <div className="w-full max-w-4xl px-2 mx-auto mt-10">
      <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
      <div className="mt-5">
        <div className="inline-flex items-center gap-2">
          <Image
            src={author.image}
            alt={`Foto de ${author.name}`}
            width={32}
            height={32}
            loading="lazy"
            className="rounded-full"
          />
          <Link href={`/profile/${author.id}`}>
            <a className="text-sm">
              <span className="font-semibold">{author.name}</span>
            </a>
          </Link>
        </div>
        <p>
          {isLoading
            ? 'Cargando fecha...'
            : `🗓 ${new Date(post?.createdAt || '').toLocaleDateString()}`}
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
        {isLoading ? (
          <p>Cargando contenido...</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
          ></div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  const post = await prisma.post.findUnique({
    where: {
      slug: slug as string,
    },
    select: {
      title: true,
      author: {
        select: {
          name: true,
          id: true,
          image: true,
        },
      },
      content: true,
    },
  })

  return {
    props: {
      postServer: post,
    } as Props,
  }
}

export default PostSlug
