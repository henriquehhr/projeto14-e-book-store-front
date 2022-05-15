import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';

import useWindowWidth from '../../hooks/useWindowWidth.js';

export default function Carrousel(props) {
    const { carrouselRef } = props;
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

    // useEffect(() => {
    //     setCarrouselWidth(carrouselRef.current.scrollWidth);
    // }, []);

    useEffect(() => {
        setCarrouselWidth(carrouselRef.current.scrollWidth);
    }, [windowWidth]);

    return (
        <div className="container">
            <div className="carrousel" ref={carrouselRef}>
                {props.children}
            </div>

            {carrouselWidth + 35 > windowWidth ? (
                <div className="arrows">
                    <AiFillLeftCircle
                        className="left-arrow"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLeftClick(carrouselRef);
                            console.log('left');
                        }}
                    />
                    <AiFillRightCircle
                        className="right-arrow"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRightClick(carrouselRef);
                            console.log('right');
                        }}
                    />
                </div>
            ) : null}
            <h1>{windowWidth}</h1>
        </div>
    );
}
