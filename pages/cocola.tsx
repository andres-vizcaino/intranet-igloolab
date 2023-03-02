import Image from 'next/image'
import { NextApplicationPage } from './_app'

const DOWNLOADS = [
  {
    title: '¿Sabes qué es el acoso laboral?',
    url: '/pdf/que-es-acoso-laboral.pdf',
    image: '/img/que-es-acoso-laboral.png',
  },
  {
    title: 'Formato de quejas para posible acoso laboral',
    url: '/docx/formato-quejas-posible-acoso-laboral.docx',
    image: '/img/que-es-acoso-laboral.png',
  },
]

const CocolaPage: NextApplicationPage = () => (
  <div className="text-center mt-5 flex flex-col items-center">
    <div className="max-w-4xl">
      <h1 className="text-5xl font-bold">Cocola</h1>
      <p className="text-xl">¿Sabes qué es el Comité de Convivencia Laboral?</p>

      <p className="text-base">
        El Comité de Convivencia Laboral es un órgano de participación de los
        trabajadores y trabajadoras en la empresa, que tiene como objetivo
        promover la convivencia laboral y la mejora de las condiciones de
        trabajo.
      </p>

      <div className="mt-10">
        <p className="text-base">
          ¿Quieres dejar un mensaje para el comité de convivencia laboral?
        </p>

        <a
          className="font-bold underline text-2xl"
          href="mailto:convivencia@igloolab.co"
        >
          convivencia@igloolab.co
        </a>

        <div className="mt-5 flex justify-center">
          <iframe
            src="https://player.vimeo.com/video/790101437?h=a9d8cc747c"
            width="640"
            height="360"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <section>
          <h4 className="text-xl my-10 underline">Descargables</h4>
          {DOWNLOADS.map((download, index) => (
            <div
              key={index}
              className="shadow-lg rounded-2xl my-2 bg-white p-4"
            >
              <div className="flex-row gap-4 flex justify-center items-center">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <Image
                      alt="profil"
                      src={download.image}
                      className="mx-auto object-cover rounded-full h-16 w-16"
                      objectFit="cover"
                      width={64}
                      height={64}
                    />
                  </a>
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-lg font-medium text-gray-600">
                    {download.title}
                  </span>
                </div>
                <a
                  download
                  href={download.url}
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Descargar
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
)

CocolaPage.requireAuth = true

export default CocolaPage
