import React from 'react'


export default function Hero() {
    return (
        <section className="relative h-[88vh] flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background video */}
            <video
                aria-hidden="true"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                poster="/videos/hero-bg.webp"
            >
                <source src="/videos/hero-bg.webm" type="video/webm" />
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/85"></div>


            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/85"></div>


            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 hero-fade-in">
                    Transforme seu <span className="text-blue-500">e‑commerce</span> com vídeos interativos
                </h1>


                <p className="text-base sm:text-lg text-gray-200 mb-8 hero-fade-in" style={{ animationDelay: '0.08s' }}>
                    Engaje seus clientes, mostre o diferencial dos seus produtos e aumente as conversões com o Wovvy.
                </p>


                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-in"
                    style={{ animationDelay: '0.15s' }}
                >
                    <a
                        href="https://typebot.co/wovvy"
                        className="group relative inline-flex items-center justify-center px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        aria-label="Começar agora"
                    >
                        <span className="relative z-10">Teste Gratuitamente</span>
                        <span
                            className="absolute inset-0 transition-transform transform -translate-x-full group-hover:translate-x-0 pointer-events-none"
                            aria-hidden
                        ></span>
                    </a>

                    <a
                        href="#demo"
                        className="inline-flex items-center justify-center px-10 py-3 rounded-full font-semibold text-lg border border-white text-white hover:bg-white hover:text-black transition-colors"
                        aria-label="Assistir demo"
                    >
                        Falar com Vendas
                    </a>
                </div>



            </div>
        </section>
    )
}