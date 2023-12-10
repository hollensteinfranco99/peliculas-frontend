import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../../css/preloader.css';

const Preloader = () => {
    useEffect(() => {
        startLoader();
    }, []);

    const startLoader = () => {
        let counterElement = document.querySelector('.counter');
        let currentValue = 0;

        const updateValue = () => {
            if (currentValue === 100) {
                return;
            }

            currentValue += Math.floor(Math.random() * 10) + 1;

            if (currentValue > 100) {
                currentValue = 100;
            }

            counterElement.textContent = currentValue;

            requestAnimationFrame(updateValue);
        };

        requestAnimationFrame(updateValue);

        gsap.to('.counter', 0.25, {
            delay: 1,
            opacity: 0,
        });

        gsap.to('.bar', 1.5, {
            delay: 1,
            height: 0,
            stagger: {
                amount: 0.5,
            },
            ease: 'power4.inOut',
        });
    };

    return (
        <div>
            <h2 className='counter'>0</h2>

            <section className='overlay'>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </section>
        </div>
    );
};

export default Preloader;