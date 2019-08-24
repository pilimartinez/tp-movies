const apiKey = "1b63eaf9251799c15f140837c94d7a45"
const customeFetch = (url) => {
    const endPoint = `https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}`
    return fetch(endPoint+url)
    .then(response => response.json())
        }

const movieCategory = (category) => {
    let movieDiv = document.getElementById('pop-mov')
    movieDiv.innerHTML = ''
    movieDiv.classList.add('popularMovies')
   let findMovies =  category.forEach(({title,poster_path}) => {
    let movie = document.createElement('div')
    movie.classList.add('movieResume')
    let movieTitle = document.createElement('p')
    movieTitle.classList.add('movieTitle')
    let movieImage = document.createElement('img')
    let imageContainer = document.createElement('a')
    imageContainer.href = '#'
    movieTitle.innerText= title
    movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}`
    movieImage.classList.add('movieImage')
    imageContainer.appendChild(movieImage)
    movie.appendChild(imageContainer)
    movie.appendChild(movieTitle)
    movieDiv.appendChild(movie)
    })   
} 
    const topFiveMovies = (movies) => {
    return movies.filter((top, i) => { if(i <5) return top})
}
 
    // nav bar
    const searchCategory = (url) => {
        fetch (`https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(res => {
            movieCategory(res.results)
        })
    }

// searchBar

const paginaActual = 1;
var task;
var newTask;

var textoBusqueda = (event)=> {
    if (event.code === 'Enter') {
        sendTask()
    }
}
var sendTask = () => {
    task = document.getElementById('searchInput');
    newTask = task.value;

    if (newTask !== "") {
        task.value = "";
        console.log(newTask)
    }
}
const searchBar = () => {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newTask}&page=${paginaActual}')
        .then(response => response.json())
        .then(res => {
           console.log(res)
        })
    }

    searchBar()
