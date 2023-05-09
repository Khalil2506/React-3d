import React from "react";
import Iphone from '../assets/images/iphone-14.jpg'
import HoldingIphone from '../assets/images/iphone-hand.png'
function Jumbotron() {

    const handleLearMore =  () => {
        const element = document.querySelector(".sound-section");
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left:0,
            behavior:'smooth'
        })
    }

    return ( 
        <div className="jumbotron-section wrapper">
            <h2 className="title">new</h2>
            <img className="logo" src={Iphone} alt="iphone"></img>
            <p className="text">Big and bigger</p>
            <span className="description">
                From $41.62/mo. for 24 mo. or $999 before trade-in
            </span>
            <ul className="links">
                <li>
                    <button className="button">buy</button>
                </li>
                <li>
                    <a className="link" onClick={handleLearMore}>Learn mone</a>
                </li>

            </ul>
            <img className="iphone-img" src={HoldingIphone} alt="iphone 14" />

        </div>
    );
}

export default Jumbotron;