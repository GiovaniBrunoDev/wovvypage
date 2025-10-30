import React from "react";
import { FaChartLine, FaCogs, FaGlobe, FaPalette } from "react-icons/fa";

const cards = [
  {
    image:
      "https://cdn.prod.website-files.com/68534b92397efd8baad925b1/685c2684bf2c473c4e5a810e_STREAMSHOP_LIVECOMMERCE.jpg",
    title: "Análise Avançada de Desempenho",
    description:
      "Entenda o impacto real de cada vídeo e como ele influencia suas vendas. Nossa análise ajuda você a tomar decisões mais inteligentes.",
    features: [
      { icon: FaChartLine, text: "Desempenho individual por vídeo" },
      { icon: FaGlobe, text: "Métricas integradas com GTM, GA e Meta Pixel" },
    ],
    link: "/analytics",
    style: {
      buttonBg: "bg-[#00C6A2]",
      buttonHover: "hover:bg-[#00a88b]",
    },
  },
  {
    image:
      "https://cdn.prod.website-files.com/68534b92397efd8baad925b1/6860417aa7f2c2cd5e2271b7_BRANDING_CUSTOMIZATION.jpg",
    title: "Personalização Visual Total",
    description:
      "Adapte os stories e vídeos interativos ao estilo da sua marca. Escolha cores, logotipo e layout que refletem sua identidade.",
    features: [
      { icon: FaPalette, text: "Cores, logo e tipografia personalizáveis" },
      { icon: FaCogs, text: "Configurações simples e intuitivas" },
    ],
    link: "/customization",
    style: {
      buttonBg: "bg-[#6B4EFF]",
      buttonHover: "hover:bg-[#593ee6]",
    },
  },
];

export default function AudienceDataSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Imagem */}
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-8 flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>

              {/* Features */}
              <div className="flex flex-col gap-3 mt-2">
                {card.features.map((feature, j) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={j}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="text-xl text-[#00C6A2]">
                        <Icon />
                      </div>
                      <p className="text-sm">{feature.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Botão */}
              <a
                href={card.link}
                className={`mt-4 inline-block ${card.style.buttonBg} text-white font-semibold px-6 py-3 rounded-xl shadow ${card.style.buttonHover} transition-all duration-300 w-max`}
              >
                Saiba mai
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
