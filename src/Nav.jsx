import { useState } from "react";

function Nav(){
    return(
        <div className="navbar">
            <p><span className="blackwords">Lily Ballif</span> is a photographer based in Utah, USA. </p>
            <p className="navButton" onClick={() => {toggleMode()}}>Menu</p>
        </div>
    );
}

export default Nav