// File: src/components/SectionPlanos.jsx
import { FiCheck } from "react-icons/fi";

const planos = [
    {
        name: "Starter",
        price: "Grátis",
        features: ["5 vídeos ativos", "Personalização básica", "Sem análises", "Suporte por e-mail"],
    },
    {
        name: "Pro",
        price: "R$ 49,90/mês",
        features: ["50 vídeos", "Personalização avançada", "Análises completas", "Integração redes sociais", "Suporte prioritário", "Teste Grátis 7 dias"],
        popular: true,
    },
    {
        name: "Premium",
        price: "R$ 149,90/mês",
        features: [
            "Vídeos ilimitados",
            "Personalização avançada",
            "Análise avançada",
            "Atualizações em primeira mão",
            "Suporte 24h",
            "Gerente de conta dedicado",
            "Funcionalidades exclusivas",
        ],
        premium: true,
    },
];

export default function SectionPlanos() {
    return (
        <section id="planos" className="w-full py-24 bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 mb-4">
                        Planos Woovy
                    </h2>
                    <div className="flex justify-center mb-6">
                        <span className="w-20 h-1 bg-blue-400 rounded-full"></span>
                    </div>
                    <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto">
                        Escolha o plano ideal para o seu negócio.
                    </p>
                </div>


                <div className="grid md:grid-cols-3 gap-10">
                    {planos.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`
                relative rounded-3xl p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                ${plan.popular
                                    ? "bg-white ring-2 ring-blue-500"
                                    : plan.premium
                                        ? "bg-gradient-to-t from-blue-50 to-white ring-1 ring-blue-300"
                                        : "bg-white"}
              `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                                        Mais Popular
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold mb-3">{plan.name}</h3>
                                <p className="text-3xl md:text-4xl font-extrabold text-gray-900">{plan.price}</p>
                            </div>

                            <ul className="space-y-4 mb-10 text-gray-700">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-center gap-3">
                                        <FiCheck className={`flex-shrink-0 ${plan.popular || plan.premium ? "text-blue-600" : "text-gray-500"}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`
                  w-full py-4 rounded-xl font-semibold text-lg transition-all
                  ${plan.popular || plan.premium
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"}
                `}
                            >
                                Começar Agora
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
