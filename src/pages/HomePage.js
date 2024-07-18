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
import { UserContext } from "../context/UserContext";
import "./css/HomePage.css";

function LoadingGif() {
  return (
    <center className="loading">
      <img src="./images/Ellipsis@1x-2.2s-200px-200px.gif" alt="loading..." />
    </center>
  );
}

function EndOfFeed(resetFeed) {
  return (
    <center className="endOfFeed">
      <img
        style={{ width: "256px" }}
        src="./images/tumbleweed.png"
        alt="loading..."
      />
      <h3>Looks like we're all out of posts...</h3>
      <h4>
        <a href="#sliders">Refresh your feed</a> to see new stuffs!
      </h4>
    </center>
  );
}

function Post({
  postId,
  userId,
  postTime,
  postTitle,
  postThumbnail,
  CardContent,
}) {
  const { users } = useContext(UserContext);
  let usr = users.find((user) => user.UserId == userId);
  return (
    <div id={"post_" + postId} className="card">
      <div className="card-body">
        <img className="profilePic" src={"./images/anonymous-user.webp"} />
        <h5 className="card-title">{usr.FullName}</h5>
        <i>{postTime}</i>
      </div>
      <div className="container">
        <h5>{postTitle}</h5>
        <p className="card-text">{CardContent}</p>
      </div>
      <img
        className="card-img-bottom"
        src={postThumbnail}
        alt="Card image cap"
      />
    </div>
  );
}

function FeaturedSubject({
  SubjectId,
  SubjectTitle,
  SubjectTagLine,
  SubjectThumbnail,
}) {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={"./thumbnails/" + SubjectThumbnail}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{SubjectTitle}</h5>
        <p
          className="card-text"
          style={{ textDecoration: "none", color: "black" }}
        >
          {SubjectTagLine}
        </p>
        <div className="featured-subject-btn-filler"></div>
        <a
          href={"./Subject/" + SubjectId}
          className="btn btn-primary position-absolute"
          style={{ bottom: "16px" }}
        >
          Explore
        </a>
      </div>
    </div>
  );
}

function HomePage() {
  const displayedPostsList = useRef([]);
  const pageNum = useRef(0);
  const appending = useRef(false);
  const outOfPosts = useRef(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [featuredSubjectsList, setFeaturedSubjectsList] = useState([]);

  function getPosts(amount) {
    //console.log(outOfPosts.current);
    if (!appending.current && !outOfPosts.current) {
      appending.current = true;
      //console.log("Start appending");
      axios
        .get("http://localhost:9999/Blog", {
          params: {
            _start: pageNum.current * amount,
            _limit: amount,
          },
        })
        .then((res) => {
          if (res.data.length < 1) {
            outOfPosts.current = true;
            //console.log("Y");
            //console.log(outOfPosts.current);
          }
          forceUpdate(1);

          setTimeout(() => {
            displayedPostsList.current = [
              ...displayedPostsList.current,
              ...res.data,
            ];
            pageNum.current++;
            appending.current = false;
            forceUpdate(1);
          }, 700);
        });
    }
  }

  const handleScroll = (e, element) => {
    //console.log(appending.current);
    const bottom =
      element.getBoundingClientRect().bottom < window.innerHeight + 400;
    if (bottom && !appending.current && !outOfPosts.current) {
      getPosts(5);
    }
  };

  useEffect(() => {
    const wrappedElement = document.getElementById("home-screen");
    document.addEventListener("scroll", (e) => handleScroll(e, wrappedElement));

    //console.log(getPosts(pageNum.current, 5));
    //console.log(displayedPostsList);
    //console.log(outOfPosts.current);
    getPosts(5);

    axios
      .get(
        "http://localhost:9999/Subject?IsFeaturedSubject=1&SubjectStatus=1",
        {
          params: {
            _limit: 10,
          },
        },
      )
      .then((res) => {
        setFeaturedSubjectsList(res.data);
      });
  }, []);

  function resetFeed() {
    pageNum.current = 0;
    displayedPostsList.current = [];
    outOfPosts.current = false;
    getPosts(5);
    forceUpdate(1);
    //console.log(displayedPostsList);
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
        <div className="featured-subject">
          <h2>Featured subjects</h2>

          <div className="d-flex flex-row flex-nowrap overflow-auto">
            {featuredSubjectsList.map((sub) => (
              <FeaturedSubject
                SubjectId={sub.SubjectId}
                SubjectThumbnail={sub.SubjectThumbnail}
                SubjectTitle={sub.SubjectTitle}
                SubjectTagLine={sub.SubjectTagLine}
              />
            ))}
          </div>
        </div>

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
              postTime={post.UpdatedTime}
              postTitle={post.BlogTitle}
              postThumbnail={post.Thumbnail}
              CardContent={post.PostText}
            />
          ))}
          {appending.current && !outOfPosts.current ? <LoadingGif /> : ""}
          {outOfPosts.current ? (
            <EndOfFeed resetFeed={() => resetFeed()} />
          ) : (
            ""
          )}
        </div>
      </Container>
    </Container>
  );
}

export default HomePage;
