const apiKey = "1b63eaf9251799c15f140837c94d7a45"
let currentPage = 1

const customFetch = (url) => {
    const endPoint = `https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}&page=${currentPage}`
    return fetch(endPoint+url)
    .then(response => response.json())
 
        }

// inicial page
const initialize = () => {
    customFetch('popular')
    .then(res => movieTopFive(res.results,'popular','POPULAR'))
    customFetch('top_rated')
    .then(res => movieTopFive(res.results,"top_rated",'TOP RATED'))
    customFetch('upcoming')
    .then(res => movieTopFive(res.results,"upcoming",'UPCOMING')) 
    customFetch('now_playing')
    .then(res => movieTopFive(res.results,"now_playing",`NOW
    PLAYING`))
}


 //first five
const movieTopFive = (category,container,title) => {
    let movieDiv = document.getElementById(container)
    movieDiv.innerHTML = ''
    movieDiv.classList.add('categoryMovies')
    let movieDivTitle = document.createElement('p')
    movieDivTitle.innerText = title
    movieDivTitle.classList.add("movieDivTitle")
    let movieDivLink = document.createElement('a')
    movieDivLink.innerText = "View More >"
    movieDivLink.href = "#"
    movieDivLink.classList.add("movieDivLink")
    movieDiv.appendChild(movieDivTitle)

    let filterMovies =  category.filter((top, i) => { if(i <5) return top})
    filterMovies.forEach(({title,poster_path, id}) => {  
        let movie = document.createElement('div')
        movie.classList.add('movieResume')
        let movieImage = document.createElement('img')
        movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}`
        movieImage.classList.add('movieImage')
        let imageContainer = document.createElement('a')
        imageContainer.href = '#'
        imageContainer.classList.add("movieLink")
        const li = document.createElement("li")
        li.classList.add("movieBox")
        li.onclick = () =>toggleFunction(id)
        let movieTitle = document.createElement('p')
        movieTitle.innerText= title
        movieTitle.classList.add('movieTitle')
        imageContainer.appendChild(movieImage)
        
        li.appendChild(imageContainer)
        movie.appendChild(li)
        movie.appendChild(movieTitle)
        movieDiv.appendChild(movie)
        movieDiv.appendChild(movieDivLink)
    })   
} 






// searchBar

let lastRequest;
    
const handleSearch = () => {
     let query = event.target.value;
        if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
            lastRequest = query;
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
                .then((res) => res.json())
                .then((res) => printQueryResults(res.results));
        }
  };
    
const printQueryResults = (movies) => {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    movies.forEach(({title, id, original_title}) => {
        let movie = document.createElement('a');
        movie.classList.add("result")
        let titles = title === original_title ? title : `${title} (${original_title})`;
        movie.innerText = titles;
        movie.href = '#';
        movie.onclick = () => toggleFunction(id);
        container.appendChild(movie);
        });
    };    
    

// movie results
const movieCategory = (category) => {
    let movieDiv = document.getElementById('category-movies')
    movieDiv.innerHTML = ''
    movieDiv.classList.add('categoryMovies')    

    
    let findMovies =  category.forEach(({title,poster_path, id}) => {
        let movie = document.createElement('div')
        movie.classList.add('movieResume')
        let movieImage = document.createElement('img')
        let imageContainer = document.createElement('a')
        imageContainer.href = '#'
        imageContainer.classList.add("movieLink")
        let movieTitle = document.createElement('p')
        movieTitle.classList.add('movieTitle')
        const li = document.createElement("li")
        li.classList.add("movieBox")
        li.onclick = () =>toggleFunction(id)
        movieTitle.innerText= title
        movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}`
        movieImage.classList.add('movieImage')
        imageContainer.appendChild(movieImage)
        
        li.appendChild(imageContainer)
        movie.appendChild(li)
        movieDiv.appendChild(movie)
        movie.appendChild(movieTitle)
    }) 
} 


    // more pages  --> hay que cambiarle la url, que sea dinamica. 

const morePages = (url) => {
    currentPage ++
        
        fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=${apiKey}&page=${currentPage}`)
        .then(response => response.json())          
        .then(res => movieCategory(res.results))

}
 
const CreateButton = (movieType) => {
    let buttonDiv = document.getElementById('buttonDiv')
    buttonDiv.innerHTML = ''
    let buttonDetail = document.createElement('button')
        buttonDetail.onclick = ()=> morePages(movieType)
        buttonDetail.innerText = "LOAD MORE"
        buttonDetail.classList.add('buttonLoadMore')
        buttonDiv.appendChild(buttonDetail) 
        
}

 // modal

    const loadModal = (movieId) =>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(res => {
                const mainTitleNode = document.getElementById("mainTitle")
                mainTitleNode.innerText = res.title 
                document.getElementById("img-modal").src = `https://image.tmdb.org/t/p/w500${res.poster_path}`
                const descriptionNode =document.getElementById("movieDescription")
                descriptionNode.innerText=res.overview
                const genreNode = document.getElementById("genre")
                const genreList = []
                res.genres.forEach(({name})=>genreList.push(name))
                genreNode.innerText= genreList.join(", ")
                const releaseDateNode = document.getElementById("releaseDate")
                releaseDateNode.innerText = res.release_date 

        })
    }  
    const toggleFunction = (movieId) => {
        var modal = document.getElementById("modalContainer");
        if (modal.style.display === "none") {
            loadModal(movieId)
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    }

// nav bar


const allCategory = (url) => {
    customFetch(url)
       .then(res => {
           
           movieCategory(res.results)
       })
       CreateButton(url)
}

// burger menu

const showData = () => {
   let container = document.getElementById('aside')
   if (container.style.display === "none") {
    container.style.display = "block";
} else {
    container.style.display = "none";
}
}
