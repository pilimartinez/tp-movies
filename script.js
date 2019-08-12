fetch('https://api.themoviedb.org/3/movie/550?api_key=1b63eaf9251799c15f140837c94d7a45')
    .then(response => response.json())
    .then(res => console.log(res))
