import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../LiveshopAdCarousel.css';
import LiveshopAdVideo from './LiveshopAdVideo';

const carouselData = [
    {
        slug: '0oEhDSY5',
        url: 'https://videos-gcp.streamshop.com.br/vod/d6059aab-f704-44e0-8489-37f662a0cdee_transcode_100020.mp4',
        thumbnail: 'https://files-gcp.streamshop.com.br/e4a07151-e494-4848-8918-672d2b6951c5.jpg',
        storeLogo: 'https://files-gcp.streamshop.com.br/e4d673ec-01e6-4ae2-ab55-09dbcbb742be.png',
        products: [
            { name: 'Bourbon Hoteis', image: 'https://files-gcp.streamshop.com.br/400381f9-8620-446e-9e87-0548ecd42422.png', displayText: 'Visite o site!' },
        ],
    },
    {
        slug: 'sgUpMnv5',
        url: 'https://videos-gcp.streamshop.com.br/vod/b8537b7b-532c-4ffe-a5de-9aa14f6edcf4_transcode_100020.mp4',
        thumbnail: 'https://files-gcp.streamshop.com.br/c60532a6-2bff-447d-a97b-8f6774c49ad3.jpg',
        storeLogo: 'https://files-gcp.streamshop.com.br/e4d673ec-01e6-4ae2-ab55-09dbcbb742be.png',
        products: [
            { name: 'Espaço Smart', image: 'https://files-gcp.streamshop.com.br/4278bbeb-4ff1-45a0-b52d-d0a4a4bae418.png', displayText: 'Veja no site' },
        ],
    },
    {
        slug: 'de7a0432-966c',
        url: 'https://videos-gcp.streamshop.com.br/vod/de7a0432-966c-40da-837f-02c109d75a03_transcode_100020.mp4',
        thumbnail: '',
        storeLogo: 'https://files-gcp.streamshop.com.br/e4d673ec-01e6-4ae2-ab55-09dbcbb742be.png',
        products: [
            { name: 'Produto Exemplo', image: '', displayText: 'Veja!' },
        ],
    },
];

function LiveshopAdCarousel({ data = carouselData, borderRadius = '18px' }) {
    const extendedData =
        data.length < 5
            ? Array.from({ length: Math.ceil(5 / data.length) }, () => data).flat().slice(0, 5)
            : data;

    return (
        <div
            className="swiper-container"
            style={{
                borderRadius,
                height: '500px',
                maxWidth: '1699px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Swiper
                modules={[Navigation]}
                loop={true}
                loopedSlides={extendedData.length}
                watchSlidesProgress={true}
                spaceBetween={16}
                slidesPerView={5}
                slidesPerGroup={1}
                centeredSlides={false}
                navigation={true} // 👈 deixa o Swiper criar os botões internamente
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 8,
                        centeredSlides: true,
                    },
                    640: {
                        slidesPerView: 1.5,
                        spaceBetween: 12,
                        centeredSlides: true,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                        centeredSlides: false,
                    },
                }}
                style={{ padding: '0px 30px' }}
                className="swiper"
            >
                {extendedData.map((video, index) => (
                    <SwiperSlide key={`${video.slug}-${index}`}>
                        <LiveshopAdVideo videoData={video} borderRadius={borderRadius} />
                    </SwiperSlide>
                ))}

                {/* Botões criados manualmente DENTRO do container 👇 */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </Swiper>




        </div>
    );
}

export default LiveshopAdCarousel;
