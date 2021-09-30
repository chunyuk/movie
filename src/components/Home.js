import React , {useEffect}from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from "axios";
import MovieModal from "./MovieModal";

import MovieStatus from "./MovieStatus";
import  Liked from "./Liked";
import { MOVIE_LIST_URL,BASE_IMG_URL, API_KEY} from '../config';
import {Container, Row, Col, Modal ,Button,Pagination,Badge} from 'react-bootstrap';
import '../custom.css';

const Home = ({dislikeMovie ,likeMovie, likedMovies})=>{

  const [movies, setMovies,modal, setModal] = MovieStatus();

  useEffect(()=>{
        getMoviesList()
  },[movies.currentPage]);

  const loadMoreMovies = ()=> {
      setMovies(prevMovie =>({...prevMovie,currentPage:(movies.currentPage+1)}));
  }

  const getMoviesList = () =>{
    if(movies.currentPage <= movies.totalPage){
    axios.get(MOVIE_LIST_URL+API_KEY+'&language=en-US&page='+movies.currentPage).then(response =>{
      if(response.data.results){
        setMovies(prevMovie =>({...prevMovie,totalPage:response.data.total_pages, lists:movies.lists.concat(response.data.results)}));
      }
    });
    }
  }

  return (
    <Container fluid>
      <Row>
      {movies.lists.map((movie,index) =>(
        <Col lg={3} md={4} sm ={6} xl={3} xxl={2} className="moive-item" rounded="true" key={index}>
            <Row>
            <img src={BASE_IMG_URL+movie.poster_path} alt='movie' onClick= {()=>setModal({modalShow:true, selectedMovie:movie})}></img>
            </Row>
            <Row>
            {(likedMovies.find((m) =>m.id === movie.id)) &&
              <Badge className="liked" bg="success">You Liked this movie</Badge>
              }
            </Row>
        </Col>
      ))}
      </Row>

      <MovieModal
        data={modal.selectedMovie}
        likeMovie={likeMovie}
        dislikeMovie={dislikeMovie}
        show={modal.modalShow}
        setModal={setModal}
        onHide={() => setModal({...modal,modalShow:false})}
      />

      <Row>

      {(movies.currentPage <= movies.totalPage) &&
                <Button text="More" onClick={loadMoreMovies} variant="primary">More</Button>
            }
      </Row>
    </Container>
  );
}

export default Home;
