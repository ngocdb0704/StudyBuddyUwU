import React, { useContext, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "./css/HomePage.css";

function HomePage() {
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
	  console.log(bottom)
    if (bottom) { alert("Bottom") }
  }

	function resetFeed() {
	}

  return (
    <Container className="mt-3" onScroll={(e) => this.handleScroll(e)} style={{height: "3000px"}}>
      <Carousel>
        <Carousel.Item>
          <div className="slider">
            <img src="./images/Promotional1.png" />
          </div>
          {/*<Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>*/}
        </Carousel.Item>
        <Carousel.Item>
          <div className="slider">
            <img src="./images/Promotional2.jpg" />
          </div>
          {/*<Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>*/}
        </Carousel.Item>
        <Carousel.Item>
          <div className="slider">
            <img src="./images/Promotional3.jpg" />
          </div>
          {/*<Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>*/}
        </Carousel.Item>
      </Carousel>

      <Container>
        <div className="p-2 mt-5 rounded bg-light d-flex sticky-top">
          <h3 className="mx-2 my-0" style={{lineHeight: "46px"}}>
            Sort by:{" "}
          </h3>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="SortHot"
            autoComplete="off"
            checked
          />
          <label htmlFor="SortHot" className="lh-lg mx-2 btn btn-outline-primary">
            Hot <i className="bi bi-fire"></i>
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            id="SortNew"
            autoComplete="off"
          />
          <label htmlFor="SortNew" className="lh-lg mx-2 btn btn-outline-primary">
            New <i className="bi bi-bar-chart-line"></i>
          </label>
          <div style={{flexGrow: 1}}></div>
          <button
            className="lh-lg mx-2 btn btn-outline-warning active"
            onClick={resetFeed}
          >
            Reset feed
          </button>
        </div>

        <div id="posts" className="post-list"></div>
      </Container>
    </Container>
  );
}

export default HomePage;
