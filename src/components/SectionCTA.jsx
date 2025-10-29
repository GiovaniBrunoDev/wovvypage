// File: src/components/SectionCTA.jsx
export default function SectionCTA() {
  return (
    <section className="w-full py-28 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Vamos começar a transformação <br className="hidden md:block" />
          do seu e-commerce?
        </h2>

        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Com a <span className="font-semibold text-blue-600">Wovvy</span>, seu e-commerce se destaca, encanta e converte — tudo de forma automática.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href=""
             className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Começar Agora
          </a>

          <a
            href=""
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-blue-700 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            Falar com Vendas
          </a>
        </div>
      </div>
    </section>
  );
}
