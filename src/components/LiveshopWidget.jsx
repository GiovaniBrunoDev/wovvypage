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
  const [isMinimized, setIsMinimized] = useState(false);
  const [showProductCard, setShowProductCard] = useState(false);
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
    setShowProductCard(false);

    const timer = setTimeout(() => {
      setShowProductCard(true);
    }, 2500); // aparece depois de 1.5s

    return () => clearTimeout(timer);
  }
}, [showModal, currentIndex]);

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
      {/* ===== WIDGET OU ABA ===== */}
      {!isMinimized ? (
        <div
          style={{
            position: "fixed",
            bottom: "130px",
            right: "15px",
            display: "flex",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {/* BOTÃO FECHAR PREMIUM */}
          <div
            onClick={() => setIsMinimized(true)}
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = "rgba(0,0,0,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "rgba(0,0,0,0.75)";
            }}
          >
            ✕
          </div>

          <div
            style={{
              position: "relative",
              width: "260px",
              height: "160px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* LEGENDA */}
            <div
              style={{
                position: "absolute",
                right: "100px",
                background: "linear-gradient(90deg, #1D4ED8, #3B82F6)",
                color: "#fff",
                padding: "8px 18px",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transform: "translateX(120%)",
                animation: "slideLeft 4s ease-in-out forwards",
                animationDelay: "4s",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              Conheça a Wovvy
            </div>

            {/* BOTÃO VÍDEO */}
            <div
              onClick={() => setShowModal(true)}
              style={{
                width: "100px",
                height: "160px",
                borderRadius: "18px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                zIndex: 2,
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

          {/* KEYFRAMES */}
          <style>
            {`
              @keyframes slideLeft {
                0% { transform: translateX(120%); }
                25% { transform: translateX(0%); }
                75% { transform: translateX(0%); }
                100% { transform: translateX(120%); }
              }
            `}
          </style>
        </div>
      ) : (
        /* ===== ABA VERTICAL ===== */
        <div
          onClick={() => setIsMinimized(false)}
          style={{
            position: "fixed",
            bottom: "150px",
            right: "0px",
            background: "linear-gradient(180deg, #1D4ED8, #3B82F6)",
            color: "#fff",
            padding: "14px 8px",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "-4px 0 15px rgba(0,0,0,0.3)",
            zIndex: 9999,
            transition: "all 0.3s ease",
          }}
        >
          Conheça a Wovvy
        </div>
      )}


      {/* ===== MODAL ===== */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2147483647,
          }}
        >
          {/* ===== CONTAINER 9:16 ===== */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              height: window.innerWidth < 768 ? "100%" : "100vh",
              aspectRatio: "9 / 16",
              maxWidth: "100vw",
              background: "#000",
              borderRadius: window.innerWidth < 768 ? "0px" : "20px",
              overflow: "hidden",
              boxShadow:
                window.innerWidth < 768
                  ? "none"
                  : "0 30px 80px rgba(0,0,0,0.6)",
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
            {showProductCard && (
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
                  width: "85%",
                  maxWidth: "320px",
                  gap: "10px",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                  animation: "slideUpFade 0.5s ease forwards",
                }}
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
            )}
            {/* ===== BOTÕES DE AÇÃO (estilo Instagram) ===== */} <div style={{ position: "absolute", right: "20px", bottom: "260px", display: "flex", flexDirection: "column", gap: "22px", zIndex: 10, }} onClick={(e) => e.stopPropagation()} > {/* Curtir */} <ActionButton svg={<path d="M16.5 3.5c-1.74 0-3.41.81-4.5 2.09A6.008 6.008 0 0 0 7.5 3.5C4.42 3.5 2 5.92 2 9c0 5.25 10 11.5 10 11.5s10-6.25 10-11.5c0-3.08-2.42-5.5-5.5-5.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />} onClick={() => alert("Curtido! ❤️")} /> {/* Comentar */} <ActionButton svg={<path d="M21 11.5a8.38 8.38 0 0 1-9 8.5c-1.5 0-2.91-.37-4.14-1.02L3 21l1.16-4.1A8.38 8.38 0 0 1 3 11.5c0-4.66 3.82-8.5 9-8.5s9 3.84 9 8.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />} onClick={() => alert("Abrir comentários... 💬")} /> {/* Compartilhar */} <ActionButton svg={<> <line x1="22" y1="3" x2="9" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" /> <polygon points="22 3 15 22 9 15 3 12 22 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </>} onClick={() => alert("Compartilhar 🔗")} /> {/* Som */} <ActionButton svg={isMuted ? (<> <polygon points="5 9 9 9 13 5 13 19 9 15 5 15 5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <line x1="19" y1="9" x2="19" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" /> </>) : (<> <polygon points="5 9 9 9 13 5 13 19 9 15 5 15 5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M19 5a7 7 0 0 1 0 14" stroke="white" strokeWidth="2" strokeLinecap="round" /> </>)} onClick={() => setIsMuted((prev) => !prev)} /> </div>

            {/* ===== FECHAR ===== */}
            <div
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "12px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </div>
            <style>
{`
@keyframes slideUpFade {
  from {
    transform: translate(-50%, 40px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0px);
    opacity: 1;
  }
}
`}
</style>
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
