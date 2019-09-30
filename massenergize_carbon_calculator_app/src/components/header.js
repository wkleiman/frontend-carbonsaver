import React from 'react';
import Logo from '../style/images/Logo.jpg';

export const header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li><a href="#"><img src={Logo} style={{ maxWidth: 100 }} alt="MassEnergize banner" /></a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Communities</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </nav>
        </header>

    );
}