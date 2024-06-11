
import React from "react";

export default function Wow({ wow }) {

    return (
        <>
            <div id="details-column">
                <h1>{ wow.movie }, { wow.director }, { wow.year }</h1>
                <h2>(Wow { wow.current_wow_in_movie }/{ wow.total_wows_in_movie })</h2>
                <p><strong>Release Date</strong>: { wow.release_date }</p>
                <p><strong>Owen Wilson's Character</strong>: { wow.character }</p>
                <p><strong>Movie Duration</strong>: { wow.movie_duration }</p>
                <p><strong>Timestamp</strong>: { wow.timestamp }</p>
                <p><strong>Full line</strong> { wow.full_line }</p>
            </div>
            <div>
                <img src={wow.poster} alt={`Poster for ${wow.movie}`} />
            </div>
        </>
    )

}