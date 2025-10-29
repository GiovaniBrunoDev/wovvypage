import React from "react";
import { motion } from "framer-motion";
import { FaVideo, FaPuzzlePiece, FaChartLine } from "react-icons/fa";

const steps = [
    {
        title: "Crie seus vídeos",
        description: "Produza vídeos curtos dos seus produtos para engajar clientes.",
        icon: FaVideo,
        gradient: "from-blue-400 to-blue-600",
    },
    {
        title: "Adicione ao e-commerce",
        description: "Integre seus vídeos diretamente nas páginas de produto do seu site.",
        icon: FaPuzzlePiece,
        gradient: "from-purple-400 to-purple-600",
    },
    {
        title: "Aumente suas vendas",
        description: "Clientes se envolvem mais, tiram dúvidas e convertem melhor.",
        icon: FaChartLine,
        gradient: "from-green-400 to-green-600",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const cardVariants = {
    offscreen: { y: 40, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.3, duration: 0.7 },
    },
};

const iconVariants = {
    hover: { scale: 1.2, rotate: [0, 10, -10, 0] },
};

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Como funciona a <span className="text-gray-900">Wovvy</span>
                </h2>
                <p className="max-w-2xl mx-auto mb-12 text-gray-600 text-base md:text-lg">
                    Transforme a experiência de compra do seu cliente com vídeos interativos. Simples, rápido e eficiente.
                </p>

                <motion.div
                    className="grid sm:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={i}
                                className="bg-white p-8 rounded-3xl shadow-md cursor-default perspective"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05, rotateY: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.div
                                    className={`flex justify-center items-center mb-5 w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${step.gradient} text-white text-3xl shadow-lg`}
                                    variants={iconVariants}
                                    whileHover="hover"
                                    transition={{ duration: 0.5 }}
                                >
                                    <Icon />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                                <p className="text-gray-500 text-sm md:text-base">{step.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
