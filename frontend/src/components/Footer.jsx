import React from 'react'
import {Phone,Mail,GitHub,LinkedIn,YouTube,Instagram} from '@mui/icons-material'
import '../componentStyles/Footer.css'
function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            {/* section1*/}
        <div className="footer-section contact">
            <h3>Contact us</h3>
            <p><Phone fontSize='small'/>Phone:+987654321</p>
            <p><Mail fontSize='small'/>Email:akbarbashakadher@gmail.com</p>
        </div>
        {/* section2*/}
     <div className="footer-section social">
        <h3>Follow me</h3>
        <div className="social-links">
            <a href='' target='_blank'>
                <GitHub className='social-icon' />
            </a>
             <a href='' target='_blank'>
                <LinkedIn className='social-icon' />
            </a>
             <a href='' target='_blank'>
                <YouTube className='social-icon' />
            </a>
             <a href='' target='_blank'>
                <Instagram className='social-icon' />
            </a>
        </div>
     </div>
        {/* section3*/}
        <div className="footer-section about">
            <h3>About us</h3>
            <p>we provide web development tutorials and courses to help your skill improvement</p>
        </div>
        </div>
        <div className="footer-bottom">
            <p>&copy;2025Akbarbasha coding.All rights reversed</p>
        </div>
    </footer>
  )
}

export default Footer