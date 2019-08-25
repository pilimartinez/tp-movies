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
    movie.appendChild(movieTitle)
    li.appendChild(imageContainer)
    movie.appendChild(li)
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

    // modal

    const loadModal = (movieId) =>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(res => {
                const mainTitleNode = document.getElementById("mainTitle")
                mainTitleNode.innerText = res.title
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