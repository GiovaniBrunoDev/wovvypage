import React, { useState, useRef, useEffect } from "react";

export default function LiveshopWidget() {
  const VIDEOS = [
    "https://cdn.storyboost.shop/Pocket%20Ultralight-%20o%20futuro%20da%20alfaiataria%20chegou%20e%20cabe%20na%20sua%20mala.A%20nova%20vers%C3%A3o%20da%20consagrada.mp4",
  ];

  const PRODUCT = {
    img: "https://tfbsn4.vteximg.com.br/arquivos/ids/2276395-358-528/blazer-docthos-slim-pocket-meio-forro-maquinetado-ultralight-44-012-azul-frontal-primavera-verao-2025-2026-609-336336-012-1.jpg",
    name: "Blazer Slim Pocket",
    price: "R$ 399,90",
    url: "https://minha-loja.com/carrinho",
  };

  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressInterval = useRef(null);

  const playVideo = (index) => {
    setCurrentIndex(index);
    const video = videoRef.current;
    if (video) {
      video.src = VIDEOS[index];
      video.play();
    }
  };

  useEffect(() => {
    if (showModal) {
      const video = videoRef.current;
      if (video) {
        video.play();
        progressInterval.current = setInterval(() => {
          if (video.duration) {
            setProgress((video.currentTime / video.duration) * 100);
          }
        }, 100);
      }
    } else {
      clearInterval(progressInterval.current);
    }
    return () => clearInterval(progressInterval.current);
  }, [showModal]);

  return (
    <>
      {/* ===== BOTÃO FLUTUANTE COM LEGENDA ===== */}
<div
  style={{
    position: "fixed",
    bottom: "130px",
    right: "15px",
    display: "flex",
    alignItems: "center",
    zIndex: 9999,
    overflow: "visible",
  }}
>
  <div
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      overflow: "visible",
    }}
  >
    {/* ===== TEXTO QUE PASSA POR TRÁS ===== */}
    <div
      style={{
        position: "absolute",
        right: "-200px", // começa fora da tela
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "10px",
        fontFamily: "Inter, sans-serif",
        fontSize: "15px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        animation: "slideBehind 5s ease-in-out forwards",
        zIndex: 1,
      }}
    >
      Conheça a Wovvy
    </div>

    {/* ===== BOTÃO (VÍDEO) ===== */}
    <div
      onClick={() => setShowModal(true)}
      style={{
        width: "100px",
        height: "160px",
        borderRadius: "18px",
        overflow: "hidden",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 2, // botão acima do texto
        background: "#000",
      }}
    >
      <video
        src={VIDEOS[0]}
        muted
        autoPlay
        playsInline
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  </div>

  {/* ===== ANIMAÇÃO ===== */}
  <style>
    {`
      @keyframes slideBehind {
        0% {
          transform: translateX(200px);
        }
        50% {
          transform: translateX(150px);
        }
        100% {
          transform: translateX(-200px);
        }
      }
    `}
  </style>
</div>







      {/* ===== MODAL ===== */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2147483647,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* ===== VIDEO ===== */}
          <video
            ref={videoRef}
            src={VIDEOS[currentIndex]}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* ===== BARRA DE PROGRESSO ===== */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              height: "3px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#fff",
                transition: "width 0.1s linear",
              }}
            />
          </div>

          {/* ===== CARD DO PRODUTO ===== */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(20,20,20,0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              color: "#fff",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "320px",
              gap: "10px",
              fontFamily: "sans-serif",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={PRODUCT.img}
                alt={PRODUCT.name}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>
                  {PRODUCT.name}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>
                  {PRODUCT.price}
                </div>
              </div>
            </div>
            <button
              style={{
                background: "#3C6A91",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "14px",
                width: "100%",
              }}
              onClick={() => (window.location.href = PRODUCT.url)}
            >
              Adicionar ao carrinho
            </button>
          </div>

          {/* ===== BOTÕES DE AÇÃO (estilo Instagram) ===== */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              bottom: "260px",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Curtir */}
            <ActionButton
              svg={
                <path
                  d="M16.5 3.5c-1.74 0-3.41.81-4.5 2.09A6.008 6.008 0 0 0 7.5 3.5C4.42 3.5 2 5.92 2 9c0 5.25 10 11.5 10 11.5s10-6.25 10-11.5c0-3.08-2.42-5.5-5.5-5.5z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              }
              onClick={() => alert("Curtido! ❤️")}
            />

            {/* Comentar */}
            <ActionButton
              svg={
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-9 8.5c-1.5 0-2.91-.37-4.14-1.02L3 21l1.16-4.1A8.38 8.38 0 0 1 3 11.5c0-4.66 3.82-8.5 9-8.5s9 3.84 9 8.5z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              }
              onClick={() => alert("Abrir comentários... 💬")}
            />

            {/* Compartilhar */}
            <ActionButton
              svg={
                <>
                  <line
                    x1="22"
                    y1="3"
                    x2="9"
                    y2="15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="22 3 15 22 9 15 3 12 22 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              }
              onClick={() => alert("Compartilhar 🔗")}
            />

            {/* Som */}
            <ActionButton
              svg={
                isMuted ? (
                  <>
                    <polygon
                      points="5 9 9 9 13 5 13 19 9 15 5 15 5 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="19"
                      y1="9"
                      x2="19"
                      y2="15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <>
                    <polygon
                      points="5 9 9 9 13 5 13 19 9 15 5 15 5 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 5a7 7 0 0 1 0 14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                )
              }
              onClick={() => setIsMuted((prev) => !prev)}
            />
          </div>

          {/* FECHAR */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#fff",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            ✕
          </div>
        </div>
      )}
    </>
  );
}

/* ===== SUBCOMPONENTE BOTÃO DE AÇÃO ===== */
function ActionButton({ svg, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ width: "32px", height: "32px", cursor: "pointer" }}
    >
      <svg
        fill="none"
        height="32"
        viewBox="0 0 24 24"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        {svg}
      </svg>
    </div>
  );
}
