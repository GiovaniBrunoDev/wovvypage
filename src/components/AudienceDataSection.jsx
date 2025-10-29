import React from "react";
import { FaChartBar, FaGlobe } from "react-icons/fa";

// Exemplo de cards personalizáveis
const cards = [
  {
    image:
      "https://cdn.prod.website-files.com/68534b92397efd8baad925b1/685c2684bf2c473c4e5a810e_STREAMSHOP_LIVECOMMERCE.jpg",
    title: "Muito mais dados da sua audiência",
    description:
      "Obtenha dados de acesso, cliques, interações e conversão nos seus vídeos em tempo real.",
    features: [
      { icon: FaChartBar, text: "Dashboard com dados em tempo real" },
      { icon: FaGlobe, text: "Compatível com GTM, GA e Meta Pixel" },
    ],
    link: "/livecommerce",
    style: {
      bgColor: "bg-white",
      textColor: "text-gray-900",
      buttonBg: "bg-blue-500",
      buttonHover: "hover:bg-blue-600",
      borderRadius: "3xl",
      shadow: "shadow-xl",
      hoverShadow: "hover:shadow-2xl",
    },
  },
  // Adicione mais cards com estilos diferentes
];

export default function AudienceDataSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-2 gap-12">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.style.bgColor} rounded-${card.style.borderRadius} ${card.style.shadow} overflow-hidden flex flex-col md:flex-row ${card.style.hoverShadow} transition-shadow duration-300`}
          >
            {/* Imagem */}
            <div className="md:w-1/2">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Conteúdo */}
            <div className={`md:w-1/2 p-8 flex flex-col justify-center space-y-4`}>
              <h3 className={`${card.style.textColor} text-2xl font-bold`}>
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>

              {/* Features */}
              <div className="flex flex-col gap-3 mt-2">
                {card.features.map((feature, j) => {
                  const Icon = feature.icon;
                  return (
                    <div key={j} className="flex items-center gap-3 text-gray-700">
                      <div className="text-blue-500 text-xl">
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
                Saiba mais
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
