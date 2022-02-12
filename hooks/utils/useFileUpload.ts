import { useEffect, useState } from 'react'

const useFileUpload = () => {
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(undefined)
    }
  }, [image])

  return { image, setImage, preview, setPreview }
}

export default useFileUpload
