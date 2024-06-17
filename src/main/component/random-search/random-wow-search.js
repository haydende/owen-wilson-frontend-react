
import React, {useEffect, useState} from 'react'
import WowList from "../wow-list/wow-list";
import HttpService from "../../util/http-service";
import {NOT_APPLICABLE} from "../../constants";

export default function RandomWowSearch() {

    const [movieList, setMovieList] = useState([NOT_APPLICABLE])
    const [directorList, setDirectorList] = useState([NOT_APPLICABLE])

    useEffect(() => {

        async function fetchMovieNames() {
            console.log("Sending request for movie names")
            setMovieList([NOT_APPLICABLE, ...await HttpService.getMovieNames()])
        }

        async function fetchDirectorNames() {
            console.log("Sending request for director names")
            setDirectorList([NOT_APPLICABLE, ...await HttpService.getDirectorNames()])
        }

        fetchDirectorNames()
        fetchMovieNames()

    }, [])

    const [submitted, setSubmitted] = useState()
    const [wows, setWows] = useState(Array.of(0))
    const [error, setError] = useState(null)

    const [results, setResults] = useState(5)
    const [year, setYear] = useState(2000)
    const [movieName, setMovieName] = useState()
    const [directorName, setDirectorName] = useState()

    async function submit(event) {
        event.preventDefault()
        setSubmitted(true)
        console.debug(`Submitted with values [results: ${results}, year: ${year}, movieName: ${movieName}, directorName: ${directorName}`)
        const randomWows = await HttpService.getRandom(results, year, movieName, directorName)
        setWows(randomWows)
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
                        <select id="movie-name-select" name="movie-name" onChange={(event) => setMovieName(event.target.value)}>
                            { movieList.map(movie => <option key={movie} value={movie}>{movie}</option>) }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="director-name-select">Name of director:</label>
                        <select id="director-name-select" name="director-name" onChange={(event) => setDirectorName(event.target.value)}>
                            { directorList.map(director => <option key={director} value={director}>{director}</option>) }
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