import React , { useReducer, useEffect,useState }from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MovieModal from "./MovieModal";
import '../custom.css';
import MovieStatus from "./MovieStatus";
import { MOVIE_LIST_URL,BASE_IMG_URL, API_KEY} from '../config';
import {Container, Row, Col, Modal ,Button,Pagination} from 'react-bootstrap';

const Liked = ({likedMovies,dislikeMovie,likeMovie}) =>{

  const [movies, setMovies,modal, setModal] = MovieStatus();


  return (
    <Container fluid>

      <Row>

      {likedMovies.map((movie,index) =>(
        <Col lg={3} md={4} sm ={6} xl={3} xxl={2} className="moive-item" rounded="true" key={index}>
            <Row>
            <img src={BASE_IMG_URL+movie.poster_path} alt='movie' onClick=  {()=>setModal({modalShow:true, selectedMovie:movie})}></img>
            </Row>
        </Col>
      ))}
      </Row>

      { likedMovies.length <1 &&
      <Row>
        <span>You dont have any liked movies!</span>
      </Row>
      }
      <MovieModal
        data={modal.selectedMovie}
        dislikeMovie={dislikeMovie}
        show={modal.modalShow}
        setModal={setModal}
        onHide={() => setModal({...modal,modalShow:false})}

      />

    </Container>
  );

};

export default Liked;
