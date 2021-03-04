import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './Footer.css';

function Footer () {

  return (
    <div className="footer">
      
      <hr className="footer-seperator" />
   
      <div className="social-container">
        <a href="https://github.com/" className='github social'>
            <FontAwesomeIcon icon={faGithub} size='1x' />
        </a>

        <a href="https://www.facebook.com/" className='facebook social'>
            <FontAwesomeIcon icon={faFacebook} size='1x' />
        </a>

        <a href="https://twitter.com/" className='twitter social'>
            <FontAwesomeIcon icon={faTwitter} size='1x' />
        </a>

        <a href="https://youtube.com/" className='youtube social'>
            <FontAwesomeIcon icon={faYoutube} size='1x' />
        </a>
       
      </div>
   
      <section className="footer-info">
        <section className="footer-info-left">

          <section className="footer-info__returns">
            Returns Policy
            <br />
            All right reserved Ⓒ 2021
          </section>        
        </section>
        <section className="footer-info-center">
          
          <section className="footer-info__terms">
            Terms and Conditions
            <br />
            Copyright
          </section>
        </section>
        <section className="footer-info-right">

        </section>
      </section>
      <hr className="footer-seperator" />
       </div>
  
  )

}

export default Footer;