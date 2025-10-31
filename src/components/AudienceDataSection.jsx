import React from "react";
import { FaChartLine, FaCogs, FaGlobe, FaPalette } from "react-icons/fa";

const sections = [
  {
    image: "/1030.gif",
    title: "Análise Avançada de Desempenho",
    description:
      "Entenda o impacto real de cada vídeo e como ele influencia suas vendas. Nossa análise ajuda você a tomar decisões mais inteligentes.",
    features: [
      { icon: FaChartLine, text: "Desempenho individual por vídeo" },
      { icon: FaGlobe, text: "Métricas integradas com GTM, GA e Meta Pixel" },
    ],
    style: {
      accent: "text-[#00C6A2]",
      buttonBg: "bg-[#00C6A2]",
      buttonHover: "hover:bg-[#00a88b]",
    },
  },
  {
    image: "/aparencia.gif",
    title: "Personalização Visual Total",
    description:
      "Adapte os stories e vídeos interativos ao estilo da sua marca. Escolha cores, logotipo e layout que refletem sua identidade.",
    features: [
      { icon: FaPalette, text: "Cores, logo e tipografia personalizáveis" },
      { icon: FaCogs, text: "Configurações simples e intuitivas" },
    ],
    style: {
      accent: "text-[#6B4EFF]",
      buttonBg: "bg-[#6B4EFF]",
      buttonHover: "hover:bg-[#593ee6]",
    },
  },
];

export default function AudienceDataSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 space-y-24">
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`flex flex-col-reverse lg:flex-row items-center gap-10 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Texto */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {sec.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {sec.description}
              </p>

              {/* Features */}
              <div className="flex flex-col gap-3 mt-4">
                {sec.features.map((feature, j) => {
                  const Icon = feature.icon;
                  return (
                    <div key={j} className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className={`text-2xl ${sec.style.accent}`}>
                        <Icon />
                      </div>
                      <p className="text-gray-700">{feature.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Botão */}
              <a
                href="#"
                className={`${sec.style.buttonBg} ${sec.style.buttonHover} text-white font-semibold px-6 py-3 rounded-xl shadow transition-all duration-300 inline-block mt-6`}
              >
                Saiba mais
              </a>
            </div>

            {/* GIF Responsivo */}
            <div className="flex-1 w-full">
              <div className="w-full rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-auto object-contain md:object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
