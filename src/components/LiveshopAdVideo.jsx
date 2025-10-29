import React, { useState } from 'react';

function LiveshopAdVideo({ videoData, theme = 'light', borderRadius = '18px' }) {
  const [isMuted, setIsMuted] = useState(true);
  const { url, thumbnail, products } = videoData;

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  // Pega apenas o primeiro produto
  const product = products[0];

  return (
    <div
      className={`liveshop-ads-video ${theme === 'dark' ? '--dark-theme' : ''}`}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        borderRadius,
        aspectRatio: '9/16',
        position: 'relative',
      }}
    >
      {/* Vídeo */}
      <video
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        playsInline
        loop
        muted={isMuted}
        src={url}
        poster={thumbnail}
      />

      {/* Ícone de Som */}
      <div className={`lav-sound-icon ${isMuted ? '-silent' : ''}`} onClick={toggleMute}>
        <div className="lav-sound-icon-speaker">
          <div className="lav-sound-icon-speaker-box"></div>
          <div className="lav-sound-icon-speaker-cone"></div>
          <div className="lav-sound-silent lav-sound-icon-speaker-cover">
            <div className="lav-sound-icon-speaker-cover-bar"></div>
            <div className="lav-sound-icon-speaker-cover-bar"></div>
          </div>
        </div>
      </div>

      {/* Botão de Play Overlay */}
      <div className="lav-play-btn --light">
        <span className="lav-play-btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
            <path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"></path>
          </svg>
        </span>
      </div>

      {/* Card do Produto */}
      {product && (
        <div
          className="lav-product-card"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50px',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '250px',
          }}
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px' }}
            />
          )}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{product.name}</div>
            <div style={{ fontSize: '0.8rem' }}>{product.displayText}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveshopAdVideo;
