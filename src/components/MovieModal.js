import {React , useState , useEffect , useContent, useReducer}  from "react";
import {ButtonGroup,Row,Col,Modal,Button} from "react-bootstrap";
import useMovieStatus from "./MovieStatus";
const POSTER_PATH = "https://www.themoviedb.org/t/p/w220_and_h330_face";

const MovieModal = ({data,likeMovie, dislikeMovie, onHide, show, setModal}) =>{

  const action = (action,data)=>{
      if(action === 'like'){
          likeMovie(data);
      }else{
          dislikeMovie(data.id);
      }

      setModal(prevModal=>({...prevModal,modalShow:false}));
  }
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.original_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
        <Col lg={4} md={6} sm ={6} xl={4} xxl={4}>
          <img  src={POSTER_PATH+data.poster_path} alt={data.original_title}></img>
        </Col>
        <Col lg={8} md={6} sm ={6} xl={8} xxl={8}>
        <h4>Detail</h4>
        <p> Released Date : {data.release_date}</p>
        <p> Vote Average : {data.vote_average}</p>
        <p> Vote Count : {data.vote_count}</p>
        <p>
          {data.overview}
        </p>
        <ButtonGroup aria-label="Basic example">

          <Button variant="danger"  onClick={()=>action('dislike',data)}>Dislike</Button>
          {likeMovie !== undefined &&
          <Button variant="success" onClick={()=>action('like',data)}>Like</Button>
          }

        </ButtonGroup>
        </Col>
        </Row>
      </Modal.Body>
    </Modal>

)};

export default MovieModal;
