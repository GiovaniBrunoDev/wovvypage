import React from "react";

export default function VideoCommerceSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Video */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://videos.widde.io/widde-bucket-sp/demo/videos/081b1440-0ab3-4d8e-a1bd-310f9f2662d7-1738357897941-5849806/video.png"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            >
              <source
                src="https://videos.widde.io/widde-bucket-sp/demo/videos/081b1440-0ab3-4d8e-a1bd-310f9f2662d7-1738357897941-5849806/video.webm"
                type="video/webm"
              />
              <source
                src="https://videos.widde.io/widde-bucket-sp/demo/videos/081b1440-0ab3-4d8e-a1bd-310f9f2662d7-1738357897941-5849806/video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 text-gray-800">
          <p className="text-lg md:text-xl mb-4">
            Destaque a sua loja da concorrência com uma{" "}
            <strong>experiência de compra mais próxima do cliente</strong>, através do Video Commerce.
          </p>
          <p className="text-lg md:text-xl">
            Seja o <strong>guia do consumidor</strong> na sua loja on-line com vídeos desde a página inicial e{" "}
            <strong>respondendo todas as possíveis dúvidas</strong> nas páginas de produto com conteúdos demonstrativos.
          </p>
        </div>
      </div>
    </section>
  );
}
