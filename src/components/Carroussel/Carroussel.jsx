import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';

import useWindowWidth from '../../hooks/useWindowWidth.js';
import useCarrouselScroll from '../../hooks/useCarrouselScroll.js';

import { $Carroussel } from './style.js';

export default function Carrousel(props) {
    const { currentKind } = props;
    const carrouselRef = useRef(null);

    const [carrouselWidth, setCarrouselWidth] = useState(
        carrouselRef.current?.scrollWidth
    );
    const [carrouselOffsetWidth, setCarrouselOffsetWidth] = useState(
        carrouselRef.current?.offsetWidth
    );

    const carrouselScrollLeft = useCarrouselScroll(carrouselRef);
    const windowWidth = useWindowWidth();

    function handleLeftClick() {
        carrouselRef.current.scrollLeft -= 210;
    }
    function handleRightClick() {
        carrouselRef.current.scrollLeft += 210;
    }

    useEffect(() => {
        setCarrouselWidth(carrouselRef.current.scrollWidth);
        setCarrouselOffsetWidth(carrouselRef.current.offsetWidth);
    }, [windowWidth, currentKind]);

    return (
        <$Carroussel>
            <div className="carrousel" ref={carrouselRef}>
                {props.children}
            </div>

            {carrouselWidth + 35 > windowWidth ? (
                <div className="arrows">
                    {carrouselScrollLeft > 0 ? (
                        <AiFillLeftCircle
                            className="arrow left"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleLeftClick();
                            }}
                        />
                    ) : null}
                    {carrouselScrollLeft + carrouselOffsetWidth <
                    carrouselWidth ? (
                        <AiFillRightCircle
                            className="arrow right"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRightClick();
                            }}
                        />
                    ) : null}
                </div>
            ) : null}
        </$Carroussel>
    );
}
