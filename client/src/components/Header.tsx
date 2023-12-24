import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='flex gap-11'>
            <h1>Quadratic Voting</h1>
            <nav>
                <ul className='flex gap-10'>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
