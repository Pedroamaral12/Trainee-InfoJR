const BODY = document.querySelector('body')
let page_number = document.querySelector('#page-number')

if (page_number <= 0) {
    page_number == 1
}

async function getmovies() {
    const MOVIES = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page_number}`)
    const DATA = await MOVIES.json()
    return DATA.results
}

async function makehtlm() {
    const DATA = await getmovies()
    DATA.forEach(results => {
        BODY.innerHTML += `
        <section id="section-container">
            <div id="title">
                <h1 class="bold">${results.title}</h1>
            </div>
            <section id="inside-section-container">
                <div id="poster">
                    <img src="https://image.tmdb.org/t/p/w500${results.poster_path}">
                </div>
                <div id="content-container">
                    <div id="original-tile"calss="small-content">
                        <h4>Título original:</h4>
                        <h3>${results.original_title}</h3>
                    </div>
                    <div id="release-date" calss="small-content">
                        <h4>Data de lançamento:</h4>
                        <h3>${results.release_date}</h3>
                    </div>
                    <div id="original-language" calss="small-content">
                        <h4>Línguagem do filme:</>
                        <h3>${results.original_language}</h3>
                    </div>
                    <div id="vote-average" calss="small-content">
                        <h4>Média de votos:</h4>
                        <h3>${results.vote_average}</h3>
                    </div>
                </div>
            </section> 
            <div id="overview">
                <h4>Sinopse:</h4>
                <h3>${results.overview}</h3>
            </div>    
        </section>
        `

    })
}

makehtlm()