import React from "react";

const logos = [
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/66f092ce230326de68f354dd_vittal.webp",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/6876c014dbcd8b4fcbe4abbf_31de81b843a894b88d7bd47fd59f7739_c07973ca-5c67-406a-9604-5b5a2aa2191e-removebg-preview.svg",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68135195b496a12833153e07_logo-estrela.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655ba0d8c5f6f820de50ea8a_vinci.webp",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/67e2fc87fdccfc2f64cbcbcb_GrupoHOPE_Prancheta%201-03.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/665a163ebf6da39aa4895fbf_charth.webp",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/67bf166a7e9ad0294e4ec991_logo%20boca%20rosa.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/67e478420efb8beead8f62b0_bagaggio-logo-2022.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655ba0738bc76362162e044e_approve.webp",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/681351957199036811094110_logo-speedo.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/655ba0ad7a7d3f0727c36778_camys.webp",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/68135195373d52b3c7fa78b5_logo-lola.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/689fa9ad8e8a7849dc6c2069_7eb9e66200e476b0a5d0bfa0b8801f1e_novologo-brooksfield.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/689faaa8acc6f4f47e836b70_logo%20sallve.avif",
    "https://cdn.prod.website-files.com/654ec481f224407ac998cfbe/689fac0bdebccfb79360eabb_logo%20clea%20store.png",
];

export default function MarqueeSection() {
    return (
        <section className="relative py-8 bg-white overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...logos, ...logos].map((src, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 mx-8 opacity-100 hover:opacity-100 transition-opacity duration-300"
                    >
                        <img
                            src={src}
                            alt={`Logo ${i}`}
                            className="h-12 w-auto object-contain"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/*
  Gradientes nas bordas (para uso futuro)
  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
*/}

        </section>
    );
}
