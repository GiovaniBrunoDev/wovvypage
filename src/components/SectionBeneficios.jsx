// File: src/components/SectionBeneficios.jsx
import { FiStar, FiGift, FiTrendingUp } from "react-icons/fi";

const beneficios = [
  {
    icon: <FiStar className="w-6 h-6 text-blue-400" />,
    title: "Experiência próxima do físico",
    description: "Proporcione aos clientes a sensação de ver, tocar e explorar os produtos com confiança — como se estivessem em sua loja física.",
  },
  {
    icon: <FiGift className="w-6 h-6 text-blue-400" />,
    title: "Perfeito para produtos premium",
    description: "Ideal para itens de alto valor, permitindo mostrar detalhes e diferenciais que reforçam autenticidade e qualidade.",
  },
  {
    icon: <FiTrendingUp className="w-6 h-6 text-blue-400" />,
    title: "Destaque e conversão",
    description: "Crie diferenciais visuais que aumentam o engajamento, fortalecem a marca e impulsionam as vendas.",
  },
];

export default function SectionBeneficios() {
  return (
    <section className="w-full py-28 bg-[#0D1117] text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black/60 to-black/90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Por que os vídeos são essenciais para sua loja
          </h2>
          <div className="flex justify-center mb-6">
            <span className="w-20 h-1 bg-blue-500 rounded-full"></span>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Encante, engaje e converta com vídeos que transformam a experiência de compra em algo inesquecível.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {beneficios.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111827] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2 border border-gray-800"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-950/40 rounded-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
