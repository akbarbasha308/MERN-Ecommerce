import React from "react";
import "../pageStyles/ContactUs.css";

const Contact = () => {
  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Reach out anytime!</p>
      </section>

      <section className="contact-container">

        <div className="contact-form">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-card">
            <h3>Address</h3>
            <p>Tirunelveli, Tamil Nadu, India</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>support@ShopEasystore.com</p>
          </div>

          <div className="info-card">
            <h3> Phone</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>

      </section>

    </div>
  );
};

export default Contact;
