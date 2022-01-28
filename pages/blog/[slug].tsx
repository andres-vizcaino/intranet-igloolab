import usePost from 'hooks/usePost'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import MarkdownIt from 'markdown-it'
import prisma from 'lib/prisma'

type Props = {
  postServer: {
    title: string
    author: {
      image: string | null
      name: string | null
    }
    content: string | null
  } | null
}

const PostSlug = ({
  postServer: { title, author, content },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { slug } = router.query
  const { post, isLoading } = usePost(slug as string)

  const md = new MarkdownIt()

  return (
    <div className="w-full max-w-4xl px-2 mx-auto mt-10">
      <h1 className="text-3xl md:text-5xl font-semibold">{title}</h1>
      <div className="mt-5">
        <p>✏️ {author.name || 'Unknown author'}</p>
        <p>
          {isLoading
            ? 'Cargando fecha...'
            : `🗓 ${new Date(post?.createdAt || '').toLocaleDateString()}`}
        </p>
      </div>

      <div className="prose max-w-none lg:prose-base prose-sm dark:prose-invert prose-red mt-16">
        <div
          dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
        ></div>
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
      content: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  return {
    props: {
      postServer: post,
    } as Props,
  }
}

export default PostSlug
