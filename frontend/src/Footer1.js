import React from 'react'
import ScrollToTopButton from './Scroll-to-top';
import logo from '../src/Images/logo.png'

function Section6() {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={logo} alt='' className='logo-image'/>
                <h3>Nephroscan</h3>
            </div>
            <div className='inquiry'>
                <textarea placeholder='any queries? write it down here...' />
                <button className='inq-btn'>Submit</button>
                <h3>Mohil . Siddharth . Vikrant</h3>
            </div>
            <div className='btt-div'>
                {/* <button className='back-to-top-btn'>Back to Top </button> */}
                <ScrollToTopButton/>
            </div>
        </div>
    )
}

export default Section6;
