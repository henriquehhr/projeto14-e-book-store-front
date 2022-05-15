import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

export default function Carrousel(props) {
    const { carrouselRef } = props;

    function handleLeftClick(ref) {
        ref.current.scrollLeft -= 210;
    }

    function handleRightClick(ref) {
        ref.current.scrollLeft += 210;
    }

    return (
        <div className="container">
            <div className="carrousel" ref={carrouselRef}>
                {props.children}
            </div>

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
    );
}
