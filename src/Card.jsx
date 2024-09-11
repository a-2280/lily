function Card(props) {
    return(
        <div className='card' onClick={() => props.onClick()}>
            <img src={props.src} alt={props.alt} />
            <p>{props.p}</p>
        </div>
    );
}

export default Card