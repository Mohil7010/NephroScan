import React from 'react';
import myimg from './Images/kidney-4.jpg';

function Section2() {
    return (
        <div className='section-2'>
            <div className='s2-img-div'>
                <img src={myimg} alt='' className='s2-img'/>
            </div>
            <div className='s2-desc'>
                <h2 className='text'>Nephroscan</h2>
                <p>Nephroscan is an innovative website utilizing advanced machine learning algorithms to detect kidney stones with precision, offering reliable and accurate diagnostic results to assist patients and healthcare providers in effective decision-making.</p>
            </div>
        </div>
    )
}

export default Section2;
