import { useState } from "react"

import testImage1 from "./assets/testImage1.jpg"
import testImage2 from "./assets/testImage2.jpg"
import testImage3 from "./assets/testImage3.jpg"
import testImage4 from "./assets/testImage4.jpg"
import testImage5 from "./assets/testImage5.jpg"

const images = [{id: 'img1', img: testImage1,}, 
                {id: 'img2', img: testImage2,}, 
                {id: 'img3', img: testImage3,}, 
                {id: 'img4', img: testImage4,}, 
                {id: 'img5', img: testImage5,}]


function Carousel(prop) {
    const [currentImage, setCurrentImage] = useState(0);

    return(
        <>
            <nav className="carousel-nav">
                <div className="carousel-nav-left">
                    <a href="#" className="carousel-previous" onClick={() => currentImage > 0 && setCurrentImage(currentImage - 1)}>Previous</a>
                    <p>/</p>
                    <a href="#" className="carousel-next" onClick={() => currentImage < images.length - 1 && setCurrentImage(currentImage + 1)}>Next</a>
                </div>
                <div className="carousel-nav-right">
                    <a href="#" onClick={() => prop.onClose()}>Close</a>
                </div>
            </nav>
            <div className="carousel-background">
                <div className="carousel">
                    <div className="carousel-images">
                        <img src={images[currentImage].img} alt={`Carousel image ${currentImage + 1}`} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Carousel