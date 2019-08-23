const apiKey = "1b63eaf9251799c15f140837c94d7a45"
const customeFetch = (url) => {
    const endPoint = `https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}`
    return fetch(endPoint+url)
    .then(response => response.json())
        }
console.log(customeFetch("popular"))

const initialize = () => {
    customeFetch("popular")
    .then(res => {
        //console.log(res)
         popularMovies(res.results)
        //console.log(topFiveMovies(res.results))
    })
}


const popularMovies = (popularMovies) => {
    let popularMovieDiv = document.getElementById('pop-mov')
    popularMovieDiv.classList.add('popularMovies')
   let popularMov =  popularMovies.forEach(({title,poster_path}) => {
    let movie = document.createElement('div')
    movie.classList.add('movieResume')
    let popularMovieTitle = document.createElement('p') // porque no todo puede tener H1
    popularMovieTitle.classList.add('movieTitle')
    let movieImage = document.createElement('img')
    let imageContainer = document.createElement('a')
    //let popularMovieGeners = document.createElement('h2')
    //let popularMovieOverview = document.createElement('p')
    imageContainer.href = '#'
    popularMovieTitle.innerText= title
    movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}`
    movieImage.classList.add('movieImage')
    //popularMovieGeners.innerText = moment(e.release_date).format('DD/MM/YYYY')
    //popularMovieOverview.innerText = e.overview
    
    imageContainer.appendChild(movieImage)
    movie.appendChild(imageContainer)
    movie.appendChild(popularMovieTitle)
    //movie.appendChild(popularMovieGeners)
    //movie.appendChild(popularMovieOverview)
    popularMovieDiv.appendChild(movie)
    })

    
   
} 
 
const topFiveMovies = (movies) => {
   return movies.filter((top, i) => { if(i <5) return top})
}
 
// searchBar

const paginaActual = 1;

//const textoBusqueda = (event) => {
   // if (event.code === 'Enter') {
//let searchValue = event.target.value;
//return searchValue;
  //  }
//}

var task;
var newTask;

var textoBusqueda = function(event) {
    if (event.code === 'Enter') {
        sendTask()
    }
}

var sendTask = function() {
    task = document.getElementById('searchInput');
    newTask = task.value;

    if (newTask !== "") {
        task.value = "";
    }
}
const hola = "s"
const searchBar = () => {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${hola}&page=${paginaActual}')
        .then(response => response.json())
        .then(res => {
          // console.log(res)
        })
    }

    searchBar()