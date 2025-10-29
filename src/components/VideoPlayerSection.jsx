import React from "react";
import { FaBroadcastTower, FaBolt, FaShoppingCart } from "react-icons/fa";

const benefits = [
  { icon: FaBroadcastTower, title: "Widget de vídeo leve" },
  { icon: FaBolt, title: "Carregamento rápido sem impactar o site" },
  { icon: FaShoppingCart, title: "Integrado ao seu e-commerce" },
];

export default function VideoPlayerCard() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow">
          
          {/* Imagem */}
          <div className="md:w-1/2">
            <img
              src="https://cdn.prod.website-files.com/68534b92397efd8baad925b1/685c22bddcebbc768cf6a3ca_Screenshot%202025-06-25%20at%201.24.04%E2%80%AFPM.png"
              alt="Video Widget"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Conteúdo */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Widget de <span className="text-blue-500">Vídeo Interativo</span>
            </h2>
            <p className="text-gray-600">
              Adicione vídeos ao seu site sem pesar ou poluir. Nossa tecnologia garante performance máxima, fácil integração e experiência imersiva para seus clientes.
            </p>

            {/* Benefícios */}
            <div className="flex flex-col gap-4">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-blue-500 text-2xl">
                      <Icon />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
