
import React, { useState } from 'react'
import WowList from "../wow-list/wow-list";

export default function RandomWowSearch() {

    const dummyWows = [
        {
            movie: 'The Owen Wilson Movie',
            director: 'Someone That Isn\'t Owen Wilson',
            release_date: '2018',
            character: 'Owen Wilson',
            current_wow_in_movie: 1,
            total_wows_in_movie: 2,
            timestamp: '01:20:03',
            full_line: 'Wow, that\'s a lot of wows!',
            poster: '',
            audio: ''
        },
        {
            movie: 'The Owen Wilson Movie 2: The Wowenning',
            director: 'Someone Else That Isn\'t Owen Wilson',
            release_date: '2020',
            character: 'Owen Wilson',
            current_wow_in_movie: 3,
            total_wows_in_movie: 3,
            timestamp: '02:01:59',
            full_line: 'Oh wow!',
            poster: '',
            audio: ''
        }
    ]

    const [directorNames, setDirectorNames] = useState(["Wilson Owen"])
    const [movieNames, setMovieNames] = useState(["The Movie Movie 2"])
    const [submitted, setSubmitted] = useState()
    const [wows, setWows] = useState(Array.of(0))
    const [error, setError] = useState(null)

    const [results, setResults] = useState(5)
    const [year, setYear] = useState(2000)
    const [movieName, setMovieName] = useState(movieNames[0])
    const [directorName, setDirectorName] = useState(directorNames[0])

    function submit(event) {
        event.preventDefault()
        setSubmitted(true)
        setWows(dummyWows)
        console.log(`Submitted with values [results: ${results}, year: ${year}, movieName: ${movieName}, directorName: ${directorName}`)
    }

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <div>
                        <label htmlFor="results-input">Results to get:</label>
                        <input
                            id="results-input"
                            type="number"
                            value={results}
                            onChange={(event) => setResults(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="year-input">Year of movie release:</label>
                        <input
                            id="year-input"
                            type="number"
                            value={year}
                            onChange={(event) => setYear(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="movie-name-select">Name of movie:</label>
                        <select id="movie-name-select" name="movie-name">
                            { movieNames.map(movie => <option key={movie} value={movie}>{movie}</option>) }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="director-name-select">Name of director:</label>
                        <select id="director-name-select" name="director-name">
                            { directorNames.map(director => <option key={director} value={director}>{director}</option>) }
                        </select>
                    </div>
                </div>
                <div>
                    <button id="submit-button" type="submit">Submit</button>
                </div>
            </form>
            <div>
                { wows.length > 0 && submitted ? <WowList wows={wows} /> : <div>Press submit to get some results!</div> }
                { wows.length === 0 && submitted ? <div>It looks like nothing matched that criteria. Try again with something else!</div> : "" }
                { error && submitted ? <div>It looks like there was an error when getting results. Give that another, or submit an issue on GitHub is this persists!</div> : "" }
            </div>
        </>
    )

}