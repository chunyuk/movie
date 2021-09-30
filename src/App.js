import {BrowserRouter as Router,Switch,Route,Link,useParams,useRouteMatch} from "react-router-dom";
import axios from "axios";
import MovieModal from "./components/MovieModal";
import './custom.css';
import MovieStatus from "./components/MovieStatus";
import Home from './components/Home';
import Liked from "./components/Liked";
import React , { useReducer, useEffect,useState }from "react";
import {addLocalStorage, removeMovieFromStorage} from './common/movieStorage';
import {Container, Row, Col, Modal ,Button,Pagination,Badge,Navbar,Nav,NavDropdown} from 'react-bootstrap';


function App() {

    const [movies, setMovies,modal, setModal] = MovieStatus();

  useEffect(()=>{
      if(localStorage.getItem('likedMovies')){
        let movies = JSON.parse(localStorage.getItem('likedMovies'));
        setMovies(prevMovie =>({...prevMovie,likedMovies:movies}));
      }

  },[]);


  const likeMovie = (selectedMovie) =>{

    const likedMovie = movies.likedMovies.find((movie) =>movie.id === selectedMovie.id);
    if(!likedMovie){
      setMovies(prevMovie =>({...prevMovie, likedMovies:movies.likedMovies.concat(selectedMovie)}));
      addLocalStorage(selectedMovie);
    }
  }

  const dislikeMovie = (id) =>{
    const filterMovie = movies.likedMovies.filter(movie =>movie.id !== id);
    setMovies(prevMovie =>({...prevMovie, likedMovies:filterMovie}));
    removeMovieFromStorage(id);
  }

  return (
    <Router>
    <Navbar className="custom-navbar navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/liked">Liked</Nav.Link>
                </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>

        <Switch>

          <Route exact path="/">
            <Home
              dislikeMovie = {dislikeMovie}
              likeMovie = {likeMovie}
              likedMovies = {movies.likedMovies}
            />
          </Route>

          <Route path="/liked">
            <Liked
              likedMovies = {movies.likedMovies}
              dislikeMovie = {dislikeMovie}
            />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;
