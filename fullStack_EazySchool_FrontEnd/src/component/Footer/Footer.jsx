
// FooterComponent.js
import React from 'react';

function Footer() {
  return (
    <footer className="w3l-footer-29-main">
      <div className="footer-29 pt-5 pb-4">
        <div className="container pt-md-4">
          <div className="row footer-top-29">
            <div className="col-lg-4 col-md-6 footer-list-29">
              <h6 className="footer-title-29">Contact Info</h6>
              <p className="mb-2 pe-xl-5">
                Address : Eazy School, 10001, 5th Avenue, #06 lane street, NY - 62617.
              </p>
              <p className="mb-2">
                Phone Number : <a href="tel:+1(21) 234 4567">+1(21) 673 4587</a>
              </p>
              <p className="mb-2">
                Email : <a href="mailto:info@eazyschool.com">info@eazyschool.com</a>
              </p>
            </div>
            <div className="col-lg-2 col-md-3 col-6 footer-list-29 mt-md-0 mt-4">
              <ul>
                <h6 className="footer-title-29">Quick Links</h6>
                <li><a>About Us</a></li>
                <li><a>Courses</a></li>
                <li><a>Become a Teacher</a></li>
                <li><a>Contact Us</a></li>
                <li><a>Career</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 col-6 ps-lg-5 ps-lg-4 footer-list-29 mt-md-0 mt-4">
              <ul>
                <h6 className="footer-title-29">Explore</h6>
                <li><a>Blog Posts</a></li>
                <li><a>Privacy policy</a></li>
                <li><a>Contact Us</a></li>
                <li><a>License & uses</a></li>
                <li><a>Courses</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8 footer-list-29 mt-lg-0 mt-4 ps-lg-5">
              <h6 className="footer-title-29">Subscribe</h6>
              <form action="#" className="subscribe d-flex" method="post">
                <input type="email" name="email" placeholder="Email Address" required="" />
                <button className="button-style">
                  <span className="fa fa-paper-plane" aria-hidden="true"></span>
                </button>
              </form>
              <p className="mt-3">
                Subscribe to our mailing list and get updates to your email inbox.
              </p>
            </div>
          </div>
          <p className="copy-footer-29 text-center pt-lg-2 mt-5 pb-2">
            © 2023 Eazy School. All rights reserved. Design by
            <a href="https://w3layouts.com/" target="_blank" rel="noopener noreferrer"> W3Layouts</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
