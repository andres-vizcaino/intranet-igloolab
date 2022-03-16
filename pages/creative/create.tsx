import { NextPage } from 'next'
import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { createPost } from 'services/post.services'
import { useSession } from 'next-auth/react'
import { slugify } from 'utils/slugify'
import { useRouter } from 'next/router'
import useFileUpload from 'hooks/utils/useFileUpload'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import SearchCategory from 'components/SearchCategory'

type TEditorParams = {
  text: string
}

const CreatePostCreative: NextPage = () => {
  const mdParser = new MarkdownIt(/* Markdown-it options */)
  const [published, setPublished] = useState(true)
  const [title, setTitle] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const { image, preview, setImage } = useFileUpload()

  const [content, setcontent] = useState(
    `**Puedes empezar a crear el mejor articulo, edita el texto a tu izquierda!!** 
    [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/y6XdzBNC0_0/0.jpg)](https://www.youtube.com/watch?v=y6XdzBNC0_0&t)
    `
  )

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: 'image/*',
    maxSize: 2500000, // 2.5MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles?.[0]
      if (file) {
        setImage(file)
      } else {
        setImage(undefined)
      }
    },
  })

  const handleEditorChange = ({ text }: TEditorParams) => setcontent(text)

  const handleSubmit = async () => {
    await createPost({
      title,
      content,
      published,
      authorId: session?.user.id || '',
      slug: slugify(title),
    })
    router.push('/blog')
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-semibold">Crear un nuevo post creativo</h1>
      <div className="mt-5">
        <div className="flex flex-col">
          <label htmlFor="title">Titulo:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="shadow appearance-none border rounded w-full md:max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="mb-5 max-w-sm">
        <p>Imagen destacada:</p>
        {preview ? (
          <div className="mt-2 text-center flex flex-col gap-1">
            <Image
              src={preview}
              alt="preview"
              layout="responsive"
              width={'100%'}
              height={'100%'}
              objectFit="contain"
            />

            <a
              onClick={() => setImage(undefined)}
              className="text-xs mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Cambiar foto 📸
            </a>
          </div>
        ) : (
          <section className="border-dotted border-4 mt-2 text-center">
            <div {...getRootProps()} className="px-16 py-5">
              <input {...getInputProps()} accept="image/*" />
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Seleccionar foto
              </a>
              <p className="mt-1">o sueltala aquí</p>
              <p className="text-xs">Solo se permite imagenes menores de 2MB</p>
            </div>
          </section>
        )}

        {fileRejections.length > 0 && (
          <div className="mt-2 text-center text-xs text-red-500">
            La imagen selecionada es muy pesada, intenta con una menor a 2MB
          </div>
        )}
      </div>

      <p>Contenido:</p>
      <MdEditor
        style={{ height: '50vh' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={content}
      />

      <div className="my-5">
        <p>Categoria:</p>
        <SearchCategory />
      </div>

      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
      >
        Crear post Creativo 🥳
      </button>
    </div>
  )
}

export default CreatePostCreative
