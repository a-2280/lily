function Card(props) {
    return(
        <div className='card' onClick={() => props.onClick()} style={{ pointerEvents: props.disableHover ? 'none' : 'auto' }}>
            <img src={props.src} alt={props.alt} />
            <p>{props.p}</p>
        </div>
    );
}

export default Card