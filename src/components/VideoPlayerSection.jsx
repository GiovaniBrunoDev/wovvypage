import React from "react";
import { FaBroadcastTower, FaBolt, FaShoppingCart, FaSmile } from "react-icons/fa";

const benefits = [
  { 
    icon: FaBroadcastTower, 
    title: "Widget de vídeo leve", 
    description: "Roda direto no navegador sem travar o site, mesmo com múltiplos vídeos ativos." 
  },
  { 
    icon: FaBolt, 
    title: "Performance instantânea", 
    description: "Nosso player carrega em milissegundos — totalmente otimizado para SEO e Core Web Vitals." 
  },
  { 
    icon: FaShoppingCart, 
    title: "Integração e-commerce", 
    description: "Compatível com Shopify, WooCommerce, Nuvemshop e outras plataformas modernas." 
  },
  { 
    icon: FaSmile, 
    title: "Experiência imersiva", 
    description: "Transforme páginas de produto comuns em experiências que convertem e encantam." 
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto px-12 text-center"> 
        {/* Aumentei o container para manter o espaço total igual */}
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Por que escolher o <span className="text-blue-500">Wovvy</span>?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          Uma solução completa para vídeos interativos em e-commerces modernos. 
          Leve, intuitivo e feito para aumentar conversões.
        </p>

        {/* Mantém os 4 cards grandes e lado a lado no desktop */}
        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 p-10 flex flex-col items-center text-center hover:-translate-y-1 w-[350px] lg:w-[360px]"
              >
                <div className="bg-blue-500/10 text-blue-500 p-5 rounded-full text-4xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
