import { IPost } from 'models/Post.model'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { markdownToHtml } from 'utils/markdownToHtml'

const Blog: NextPage = () => {
  const { data, error } = useSWR<IPost[]>('/api/posts')

  return (
    <div className="mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Blog Creativo 🤳</h1>
        <Link href={'/blog/create'}>
          <a
            type="button"
            className="mt-4 max-w-lg bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear un articulo 🥸
          </a>
        </Link>
      </div>
      {error && <div>failed to load</div>}
      {!data && <div>Cargando todos los Articulos creativos...</div>}
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {data?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <a className="max-w-md p-10 hover:border-dotted border-8 border-violet-500 rounded-xl">
              <p className="text-3xl font-bold">{post.title}</p>
              <p
                className="text-sm mt-3"
                dangerouslySetInnerHTML={{
                  __html:
                    markdownToHtml(post.content).substring(0, 250) + '...',
                }}
              />
              <p className="font-medium mt-5">
                Escrito por: {post.author.name}
              </p>
              <p className="text-sm">
                🗓 {new Date(post?.createdAt || '').toLocaleDateString()}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog
