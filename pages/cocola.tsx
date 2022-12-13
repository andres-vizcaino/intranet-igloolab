import { NextApplicationPage } from './_app'

const CocolaPage: NextApplicationPage = () => (
  <div className="text-center mt-5">
    <h1 className="text-5xl font-bold">Cocola</h1>
    <p className="text-xl">¿Sabes qué es el Comité de Convivencia Laboral?</p>

    <p className="text-base">
      El Comité de Convivencia Laboral es un órgano de participación de los
      trabajadores y trabajadoras en la empresa, que tiene como objetivo
      promover la convivencia laboral y la mejora de las condiciones de trabajo.
    </p>

    <div className="mt-10">
      <p className="text-base">
        ¿Quieres dejar un mensaje para el comité de convivencia laboral?
      </p>

      <a href="mailto:convivencia@igloolab.co">convivencia@igloolab.co</a>
    </div>
  </div>
)

CocolaPage.requireAuth = true

export default CocolaPage
