import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';

import useWindowWidth from '../../hooks/useWindowWidth.js';

import { $Carroussel } from './style.js';

export default function Carrousel(props) {
    const carrouselRef = useRef(null);
    const [carrouselWidth, setCarrouselWidth] = useState(
        carrouselRef.current?.scrollWidth
    );
    const windowWidth = useWindowWidth();

    function handleLeftClick(ref) {
        ref.current.scrollLeft -= 210;
    }

    function handleRightClick(ref) {
        ref.current.scrollLeft += 210;
    }

    useEffect(() => {
        console.log(carrouselRef.current, carrouselRef.current.scrollWidth);
        setCarrouselWidth(carrouselRef.current.scrollWidth);
    }, [windowWidth]);

    return (
        <$Carroussel>
            <div className="carrousel" ref={carrouselRef}>
                {props.children}
            </div>

            {carrouselWidth + 35 > windowWidth ? (
                <div className="arrows">
                    <AiFillLeftCircle
                        className="arrow left"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLeftClick(carrouselRef);
                        }}
                    />
                    <AiFillRightCircle
                        className="arrow right"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRightClick(carrouselRef);
                        }}
                    />
                </div>
            ) : null}
        </$Carroussel>
    );
}
