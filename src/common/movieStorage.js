export const addLocalStorage = (movie) => {

   let movies = getMovieFromStorage();
   movies.push(movie)

   localStorage.setItem('likedMovies', JSON.stringify(movies))

}

export const getMovieFromStorage = () => {
   let movies;
   if (localStorage.getItem('likedMovies') === null ) {
       movies = []
   }
   else {
       movies = JSON.parse(localStorage.getItem('likedMovies'))
   }

   return movies;
}


export const removeMovieFromStorage = (id) => {
   let movies = getMovieFromStorage();
   movies.forEach(function(movie, index) {
       if (movie.id === id) {
           movies.splice(index, 1)
       }
   })
   localStorage.setItem("likedMovies", JSON.stringify(movies))
}
