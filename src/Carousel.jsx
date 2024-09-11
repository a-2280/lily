import { useState } from "react"

import img1 from "./assets/L1430117.jpeg"
import img2 from "./assets/L1430117.jpeg"
import img3 from "./assets/L1430117.jpeg"
import img4 from "./assets/L1430117.jpeg"
import img5 from "./assets/L1430117.jpeg"

const images = [{id: 'img1', img: img1,}, 
                {id: 'img2', img: img2,}, 
                {id: 'img3', img: img3,}, 
                {id: 'img4', img: img4,}, 
                {id: 'img5', img: img5,}]


function Carousel(prop) {
    const [currentImage, setCurrentImage] = useState(0);

    return(
        <>
            <nav className="carousel-nav">
                <div className="carousel-nav-left">
                    <a href="#" className="carousel-previous">Previous</a>
                    <p>/</p>
                    <a href="#" className="carousel-next">Next</a>
                </div>
                <div className="carousel-nav-right">
                    <a href="#" onClick={() => prop.onClose()}>Close</a>
                </div>
            </nav>
            <div className="carousel-background">
                <div className="carousel">
                    <div className="carousel-images" style={{backgroundImage: `url(${images[currentImage].img})`}}>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Carousel