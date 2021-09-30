import {useState , useEffect , useContent, useReducer} from 'react';

const useMovieStatus = () =>{

  // get movies list
  // const [movies, setMovies] = useStatus([]);
  const [movies, setMovies] = useState({
    lists: [],
    likedMovies :[],
    currentPage: 1,
    totalPage:10,
  });

  const [modal, setModal] = useState({
    modalShow:false,
    selectedMovie : []
  });

  return [movies,setMovies,modal, setModal];

};

export default useMovieStatus;
