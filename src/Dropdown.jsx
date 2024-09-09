

function Dropdown() {
    return(
        <>
            <div className="navbar">
                <p className="blackwords">Lily Ballif</p>
                <p className="navButton" onClick={() => {toggleMode()}}>Collapse</p>
            </div>
            <div className="dropdown">
                <div>
                    <ul>
                        <li><a href="#">Portraits</a></li>
                        <li className="projects">
                            <a href="#">Projects</a>
                            <ul>
                                <li><a href="#">The Sound of Liver</a></li>
                                <li><a href="#">Feel Good</a></li>
                                <li><a href="#">A Star is Born</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Email</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="background">
                    <p className="backgroundText">Lily Ballif is a photographer based in Utah, USA.</p>
                </div>
            </div>
        </>
    );
}

export default Dropdown