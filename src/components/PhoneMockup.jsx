import React from "react";

export default function PhoneMockup({
  gifSrc,
  poster,
  width = "380px",
  rounded = true,
  autoplayVideo = true,
}) {
  const isVideo =
    typeof gifSrc === "string" &&
    (gifSrc.endsWith(".mp4") ||
      gifSrc.endsWith(".webm") ||
      gifSrc.includes("video"));

  const borderRadius = rounded ? "32px" : "12px";

  return (
    <div
      className="flex items-center justify-center bg-white py-10 px-4 sm:px-6"
      style={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Moldura externa */}
      <div
        className="relative transition-transform duration-300 ease-in-out w-full max-w-[380px] sm:max-w-[360px] md:max-w-[400px]"
        style={{
          borderRadius,
          padding: "12px",
          background:
            "linear-gradient(145deg, #1f2937 0%, #111827 50%, #0a0e14 100%)",
          border: "3px solid #0f172a",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.35), 0 0 0 8px rgba(255,255,255,0.05), inset 0 1px 2px rgba(255,255,255,0.1)",
          position: "relative",
        }}
      >
        {/* Reflexo lateral */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* Tela interna */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            aspectRatio: "9 / 19.5",
            borderRadius: `calc(${borderRadius} - 10px)`,
            background: "#000",
            boxShadow:
              "inset 0 0 10px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.08)",
          }}
        >
          {/* Notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[0.4rem] sm:top-[0.6rem] z-20"
            style={{
              width: "42%",
              maxWidth: "220px",
              height: "22px",
              borderRadius: "14px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(20,20,20,0.8))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "inset 0 -1px 2px rgba(255,255,255,0.08), 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.7)",
              }}
            />
          </div>

          {/* Conteúdo */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              borderRadius: `calc(${borderRadius} - 14px)`,
              overflow: "hidden",
              background: "#111827",
            }}
          >
            {isVideo ? (
              <video
                src={gifSrc}
                poster={poster}
                autoPlay={autoplayVideo}
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <img
                src={gifSrc}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>

          {/* Indicador inferior */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3"
            style={{
              width: "34%",
              maxWidth: "160px",
              height: "6px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.15)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Botão lateral direito */}
        <div
          className="absolute right-[-4px] sm:right-[-6px] top-[60px]"
          style={{
            width: "3px",
            height: "50px",
            borderRadius: "4px",
            background: "#1e293b",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
          }}
        />

        {/* Botões de volume */}
        <div
          className="absolute left-[-4px] sm:left-[-6px] top-[80px]"
          style={{
            width: "3px",
            height: "36px",
            borderRadius: "4px",
            background: "#1e293b",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
          }}
        />
        <div
          className="absolute left-[-4px] sm:left-[-6px] top-[130px]"
          style={{
            width: "3px",
            height: "36px",
            borderRadius: "4px",
            background: "#1e293b",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
          }}
        />
      </div>
    </div>
  );
}
