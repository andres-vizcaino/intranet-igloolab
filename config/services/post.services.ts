import axios from 'axios'
import { IPost } from 'models/Post.model'

type createBody = {
  content: string
  authorId: string
  title: string
  slug: string
  published: boolean
}

export const getPostBySlug = async (slug: string) => {
  const { data } = await axios.get<IPost>(`/api/posts/${slug}`)
  return data
}

export const createPost = async ({
  content,
  authorId,
  title,
  slug,
  published,
}: createBody) => {
  await axios.post('/api/posts/create', {
    content,
    authorId,
    title,
    slug,
    published,
  })
}
