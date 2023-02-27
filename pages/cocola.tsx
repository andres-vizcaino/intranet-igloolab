import { NextApplicationPage } from './_app'

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
      </div>
    </div>
  </div>
)

CocolaPage.requireAuth = true

export default CocolaPage
