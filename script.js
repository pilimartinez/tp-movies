const mainSection = () => {
    let popularMovies = document.getElementById("pop-mov")
    let popmovList = document.createElement('li')

    popularMovies.appendChild(popmovList)
    popmovList.innerText = 'hola'
}

console.log(mainSection())