import Image from 'next/image'

const SemanaSalud = () => <main className="grid min-h-screen place-content-center">
    <h1 className="text-3xl font-bold mb-10">Bienvenido a la semana de la salud</h1>
    <img src="/img/semana-cronograma.png" alt="Calendario semana de la salud" />

    <style jsx>{`
        main {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1003%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c221 C 57.6%2c203.2 172.8%2c130.4 288%2c132 C 403.2%2c133.6 460.8%2c237.2 576%2c229 C 691.2%2c220.8 748.8%2c91.4 864%2c91 C 979.2%2c90.6 1036.8%2c221.8 1152%2c227 C 1267.2%2c232.2 1382.4%2c139 1440%2c117L1440 560L0 560z' fill='rgba(171%2c 7%2c 45%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c491 C 96%2c458 288%2c327.8 480%2c326 C 672%2c324.2 768%2c470.6 960%2c482 C 1152%2c493.4 1344%2c402.8 1440%2c383L1440 560L0 560z' fill='rgba(255%2c 0%2c 59%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1003'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: bottom;
        }
    `

    }

    </style>
</main>

export default SemanaSalud