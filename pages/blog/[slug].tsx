import usePost from 'hooks/usePost'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import MarkdownIt from 'markdown-it'
import prisma from 'lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { deletePost } from 'services/post.services'

const PostSlug = ({
  postServer: { title, author },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { slug } = router.query
  const { data: session } = useSession()
  const { post, isLoading } = usePost(slug as string)

  const md = new MarkdownIt()

  const deletePostByOwnUser = async () => {
    await deletePost(slug as string)
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

        {post?.authorId === session?.user?.id && (
          <button
            onClick={deletePostByOwnUser}
            className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Borrar este articulo 🗑
          </button>
        )}
      </div>

      <div className="prose max-w-none lg:prose-base prose-sm dark:prose-invert prose-red mt-16">
        {isLoading ? (
          <p>Cargando contenido...</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: md.render(post?.content || '') }}
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
    },
  })

  return {
    props: {
      postServer: post,
    },
  }
}

export default PostSlug
