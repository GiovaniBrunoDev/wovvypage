import React from "react";

const logos = [
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/6696929d7474e9f5d785f131_nuvem.png",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655bc70d15ed578ac27eeb53_tray.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655bc615b2093ac73396633a_shopify.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655bc63732f9bf37963bd8f9_vtex.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/669690c8844afe9fcdf44089_loja%20integrada.png",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/673273d61fcb0caf836588b6_jet-commerce.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655bc5cfbe2c34bd73671149_bagy.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655bc5e8df48f133f1b0fab5_vnda.webp",
  "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/669691f18c51930cb1f1dd50_convertr-removebg-preview%20(1).png"
];

export default function IntegrationMarquee() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">
          Integração rápida com todas as plataformas
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Sem precisar de desenvolvimento. Estas são algumas das plataformas de e-commerce que a Wovvy está presente.
        </p>

        {/* Marquee */}
        <div className="overflow-hidden relative w-full">
          <div className="flex animate-marquee gap-12 w-max">
            {logos.concat(logos, logos).map((src, i) => (
              <div key={i} className="flex-shrink-0 w-32">
                <img src={src} alt={`Logo ${i}`} className="object-contain w-full h-16" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Animação CSS */}
        <style jsx>{`
          @keyframes translateX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            display: flex;
            animation: translateX 15s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
