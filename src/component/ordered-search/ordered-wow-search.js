import React, {useRef, useState} from "react";
import WowList from "../wow-list/wow-list";

export default function OrderedWowSearch() {

    const dummyWows = [
        {
            movie: 'The Owen Wilson Movie',
            director: 'Someone That Isn\'t Owen Wilson',
            year: '2018',
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
            year: '2020',
            character: 'Owen Wilson',
            current_wow_in_movie: 3,
            total_wows_in_movie: 3,
            timestamp: '02:01:59',
            full_line: 'Oh wow!',
            poster: '',
            audio: ''
        }
    ]

    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const [useEndIndex, setUseEndIndex] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [wows, setWows] = useState(Array.of(0))

    function submit(event) {
        event.preventDefault()
        setSubmitted(true)
        setWows(dummyWows)
        console.log(`Submitted with values [startIndex: ${startIndex}, endIndex: ${endIndex}, useEndIndex: ${useEndIndex}`)
    }

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <div>
                        <label htmlFor="start-index-input">Start at index:</label>
                        <input
                            id="start-index-input"
                            type="number"
                            value={startIndex}
                            onChange={(event) => setStartIndex(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="end-index-input">End at index:</label>
                        <input
                            id="end-index-input"
                            type="number"
                            value={endIndex}
                            disabled={!useEndIndex}
                            onChange={(event) => setEndIndex(event.target.value)} />
                        <input
                            id="end-index-toggle"
                            type="checkbox"
                            onChange={() => setUseEndIndex(!useEndIndex)} />
                    </div>
                    <div>
                        <button id="submit-button" type="submit">Submit</button>
                    </div>
                </div>
            </form>
            <div id="search-results-list">
                { wows.length > 0 && submitted ? <WowList wows={wows} /> : <div>Press submit to get some results!</div> }
                { wows.length === 0 && submitted ? <div>It looks like nothing matched that criteria. Try again with something else!</div> : "" }
                { error && submitted ? <div>It looks like there was an error when getting results. Give that another go, or submit an issue on GitHub if this persists</div> : "" }
            </div>
        </>
    )
}