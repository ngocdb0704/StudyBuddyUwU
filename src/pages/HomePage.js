import axios from "axios";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useReducer,
} from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "./css/HomePage.css";

function LoadingGif() {
  return (
    <center className="loading">
      <img
        src="./public/images/Ellipsis@1x-2.2s-200px-200px.gif"
        alt="loading..."
      />
    </center>
  );
}

function EndOfFeed() {
  return (
    <center className="endOfFeed">
      <img
        style={{ width: "256px" }}
        src="./public/images/tumbleweed.png"
        alt="loading..."
      />
      <h3>Looks like we're all out of posts...</h3>
      <h4>
        <a href="#sliders" onclick="resetFeed()">
          Refresh your feed
        </a>{" "}
        to see new stuffs!
      </h4>
    </center>
  );
}

function Post({
  postId,
  userId,
  fullName,
  postTime,
  postTitle,
  postThumbnail,
  CardContent,
}) {
  return (
    <div id={"post_" + postId} className="card">
      <div className="card-body">
        <img className="profilePic" src={postThumbnail} />
        <h5 className="card-title">{fullName}</h5>
        <i>{postTime}</i>
      </div>
      <div className="container">
        <h5>{postTitle}</h5>
        <p className="card-text">{CardContent}</p>
      </div>
      <img
        className="card-img-bottom"
        src="./public/images/blogimg.jpg"
        alt="Card image cap"
      />
    </div>
  );
}

function HomePage() {
  const displayedPostsList = useRef([]);
  const pageNum = useRef(0);
  const appending = useRef(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function getPosts(amount) {
    if (!appending.current) {
      appending.current = true;
      console.log("Start appending");
      axios
        .get("http://localhost:9999/Blog", {
          params: {
            _start: pageNum.current * amount,
            _limit: amount,
          },
        })
        .then((res) => {
          displayedPostsList.current = [
            ...displayedPostsList.current,
            ...res.data,
          ];
          setTimeout(() => {
            pageNum.current++;
            appending.current = false;
            forceUpdate(1);
          }, 1000);
        });
	}
  }

  const handleScroll = (e, element) => {
    console.log(appending.current);
    const bottom =
      element.getBoundingClientRect().bottom < window.innerHeight + 400;
    if (bottom) {
      getPosts(5);
    }
  };
  useEffect(() => {
    const wrappedElement = document.getElementById("home-screen");
    document.addEventListener("scroll", (e) => handleScroll(e, wrappedElement));

    console.log(getPosts(pageNum.current, 5));
    console.log(displayedPostsList);
  }, []);

  function resetFeed() {
    pageNum.current = 0;
    displayedPostsList.current = [];
    forceUpdate(1);
    getPosts(5);
    console.log(displayedPostsList);
  }

  return (
    <Container id="home-screen" className="mt-3" style={{}}>
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
          <h3 className="mx-2 my-0" style={{ lineHeight: "46px" }}>
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
          <label
            htmlFor="SortHot"
            className="lh-lg mx-2 btn btn-outline-primary"
          >
            Hot <i className="bi bi-fire"></i>
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            id="SortNew"
            autoComplete="off"
          />
          <label
            htmlFor="SortNew"
            className="lh-lg mx-2 btn btn-outline-primary"
          >
            New <i className="bi bi-bar-chart-line"></i>
          </label>
          <div style={{ flexGrow: 1 }}></div>
          <button
            className="lh-lg mx-2 btn btn-outline-warning active"
            onClick={resetFeed}
          >
            Reset feed
          </button>
        </div>

        <div id="posts" className="post-list">
          {displayedPostsList.current.map((post) => (
            <Post
              postId={post.BlogId}
              userId={post.UserId}
              fullName={"a"}
              postTime={post.UpdatedTime}
              postTitle={post.BlogTitle}
              postThumbnai={post.Thumbnail}
              CardContent={post.PostText}
            />
          ))}
        </div>
      </Container>
    </Container>
  );
}

export default HomePage;
