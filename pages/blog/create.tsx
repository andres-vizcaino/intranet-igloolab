import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Switch } from '@headlessui/react'
import { createPost } from 'services/post.services'
import { useSession } from 'next-auth/react'
import { slugify } from 'utils/slugify'
import { useRouter } from 'next/router'
import { NextApplicationPage } from 'pages/_app'
import { createNotification } from 'services/createNotification'
import { uploadFileReturnUrl } from 'services/uploadFile.services'

type TEditorParams = {
  text: string
}

const CreateBlog: NextApplicationPage = () => {
  const mdParser = new MarkdownIt(/* Markdown-it options */)
  const [published, setPublished] = useState(true)
  const [title, setTitle] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const [content, setcontent] = useState(
    '**Puedes empezar a crear el mejor articulo, edita el texto a tu izquierda!!**'
  )

  const handleEditorChange = ({ text }: TEditorParams) => setcontent(text)

  const handleSubmit = async () => {
    await createPost({
      title,
      content,
      published,
      authorId: session?.user.id || '',
      slug: slugify(title),
    }).then(async () => {
      const notificationMessage = `${
        session?.user.name
      } ha creado un nuevo articulo en el Blog, corre a verlo! 🍻
      
      https://open.igloolab.co/blog/${slugify(title)}
      `

      await createNotification({
        text: notificationMessage,
      })
    })
    router.push('/blog')
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-semibold">Crear un nuevo articulo</h1>
      <div className="my-5">
        <div className="flex flex-col">
          <label htmlFor="title">Titulo</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="shadow appearance-none border rounded w-full md:max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
          />
        </div>
      </div>
      <MdEditor
        style={{ height: '50vh' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={content}
        onImageUpload={uploadFileReturnUrl}
      />

      <Switch.Group>
        <div className="flex items-center mt-4">
          <Switch.Label className="mr-4">Publicar articulo</Switch.Label>
          <Switch
            checked={published}
            onChange={setPublished}
            className={`${
              published ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                published ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>

      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
      >
        Crear articulo 🥳
      </button>
    </div>
  )
}

CreateBlog.requireAuth = true

export default CreateBlog
