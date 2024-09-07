import image from './assets/L1430117.jpeg'

function Card() {
    return(
        <div className='card'>
            <img className="cardImage" src={image} alt="Gem Studio" />
            <p>Gem Studio</p>
        </div>
    );
}

export default Card