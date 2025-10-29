// File: src/components/SectionNumeros.jsx
import { useEffect } from "react";
import CountUp from "react-countup";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const videos = [
  {
    id: 1,
    poster: "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151b103013b0dfa05219d9_gravacao-1-poster-00001.jpg",
    sources: [
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151b103013b0dfa05219d9_gravacao-1-transcode.mp4",
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151b103013b0dfa05219d9_gravacao-1-transcode.webm"
    ]
  },
  {
    id: 2,
    poster: "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151caff59513b37b125864_gravacao-2-poster-00001.jpg",
    sources: [
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151caff59513b37b125864_gravacao-2-transcode.mp4",
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151caff59513b37b125864_gravacao-2-transcode.webm"
    ]
  },
  {
    id: 3,
    poster: "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151cb567cabba6d3b85545_gravacao-3-poster-00001.jpg",
    sources: [
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151cb567cabba6d3b85545_gravacao-3-transcode.mp4",
      "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68151cb567cabba6d3b85545_gravacao-3-transcode.webm"
    ]
  },
];

const cards = [
  {
    id: 1,
    number: 84,
    text: "dos consumidores deixam de comprar online",
    description: "Isso acontece por medo do produto não ser como foi descrito. Já com os vídeos, é possível demonstrar melhor o item e os detalhes mais importantes."
  },
  {
    id: 2,
    number: 63,
    text: "buscam vídeos antes da compra",
    description: "Mostre o que seus clientes precisam saber, sem que eles precisem sair do seu site para pesquisar por vídeos em redes sociais."
  },
  {
    id: 3,
    number: 65,
    text: "desistem de comprar por más experiências",
    description: "O futuro do varejo online está altamente ligado ao investimento em boas experiências para encantar o consumidor e trazer interatividade."
  }
];

export default function SectionNumeros() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
  };

  return (
    <section className="relative bg-black text-white py-28 overflow-hidden">
      {/* Background vídeos com animação suave */}
      <div className="absolute inset-0 flex justify-center gap-10 opacity-25 animate-backgroundGlow">
        {videos.map(video => (
          <motion.div
            key={video.id}
            className="w-64 h-[520px] relative rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={video.poster}
            >
              {video.sources.map(src => (
                <source key={src} src={src} />
              ))}
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </motion.div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-24 text-white">
          Vídeos já são uma necessidade para a loja online
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {cards.map(card => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              className="bg-black/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl hover:shadow-[0_15px_40px_rgba(0,255,145,0.5)] hover:-translate-y-2 transition-all duration-500 flex flex-col gap-4"
            >
              <h3 className="text-5xl font-extrabold text-blue-500">
                <CountUp end={card.number} duration={1.5} />%
              </h3>
              <p className="font-semibold text-2xl text-white">{card.text}</p>
              <p className="text-gray-200 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes backgroundGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        .animate-backgroundGlow {
          animation: backgroundGlow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
