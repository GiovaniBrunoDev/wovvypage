import React from "react";

export default function PlayerSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Imagem */}
                    <img
                        src="https://cdn.prod.website-files.com/68534b92397efd8baad925b1/68534d60fe1993a9261a0df7_6a7b438a-db4a-44da-8c19-0cdf4d707605.avif"
                        alt="Woman looking at phone screen"
                        className="w-full h-auto object-cover rounded-2xl shadow-lg"
                        loading="lazy"
                    />

                    {/* Conteúdo */}
                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Mais interatividade.{" "}
                            <span className="text-blue-500">Maior conversão.</span>
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Adicione os vídeos que sua marca já produz para as redes sociais às páginas
                            do seu site, elevando o tempo de permanência da sua audiência, ticket médio
                            e taxa de conversão.
                        </p>

                        <p className="text-gray-600 mb-6">
                            Ofereça demonstrações de produtos em tempo real, catálogos de vídeo sob
                            demanda e suporte personalizado — tudo impulsionado por uma plataforma de
                            vídeo rápida e flexível, desenvolvida para e-commerce.
                        </p>

                        {/* Centraliza só o botão */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-in" style={{ animationDelay: '0.15s' }}>
                             <a
                        href="#começar"
                        className="group relative inline-flex items-center justify-center px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        aria-label="Começar agora"
                    >
                        <span className="relative z-10">Comece Agora!</span>
                        <span
                            className="absolute inset-0 transition-transform transform -translate-x-full group-hover:translate-x-0 pointer-events-none"
                            aria-hidden
                        ></span>
                    </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
