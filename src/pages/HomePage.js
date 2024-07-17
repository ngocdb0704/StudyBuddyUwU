import React, { useContext, useEffect } from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import './css/HomePage.css'

function HomePage() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className='slider'><img src="./images/Promotional1.png" /></div>
	  	{/*<Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>*/}
      </Carousel.Item>
      <Carousel.Item>
        <div className='slider'><img src="./images/Promotional2.jpg" /></div>
	  {/*<Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>*/}
      </Carousel.Item>
      <Carousel.Item>
        <div className='slider'><img src="./images/Promotional3.jpg" /></div>
	  {/*<Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>*/}
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePage
