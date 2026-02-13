import React from "react";
import "../pageStyles/AboutUs.css";
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div className="about">

      
      <section className="about-hero">
        <h1>About Our Store</h1>
        <p>
          We deliver quality products with secure payments and fast delivery.
          Your trusted ecommerce partner.
        </p>
      </section>


      <section className="about-section">
        <div className="about-grid">
          <img
            src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
            alt="about"
          />

          <div>
            <h2>Our Story</h2>
            <p>
              Our ecommerce platform was created to make online shopping simple,
              secure, and enjoyable. We carefully select products that bring
              real value to customers.
            </p>
            <p>
              With modern technology and customer-first support, we aim to give
              the best shopping experience.
            </p>
          </div>
        </div>
      </section>

     
      <section className="about-features">
        <h2>Why Choose Us</h2>

        <div className="feature-box">
          <div className="card">
            <h3> Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep.</p>
          </div>

          <div className="card">
            <h3> Secure Payments</h3>
            <p>Safe checkout with Razorpay integration.</p>
          </div>

          <div className="card">
            <h3> Premium Quality</h3>
            <p>Carefully selected products for customer satisfaction.</p>
          </div>
        </div>
      </section>

     
      <section className="about-cta">
        <h2>Start Shopping With Us Today</h2>
        <button><Link to='/products'>Shop Now</Link></button>
      </section>

    </div>
  );
};

export default About;
