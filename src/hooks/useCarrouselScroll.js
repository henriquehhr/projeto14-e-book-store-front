import { useState, useEffect } from 'react';

export default function useCarrouselScroll(carrouselRef) {
    const [carrouselScrollLeft, setCarrouselScrollLeft] = useState(0);

    useEffect(() => {
        const handleScroll = () =>
            setCarrouselScrollLeft(carrouselRef.current.scrollLeft);
        carrouselRef.current.addEventListener('scroll', handleScroll);
    });

    return carrouselScrollLeft;
}
