
import React from "react";
import Wow from "../wow/wow";

export default function WowList({ wows }) {

    return (
        <div>
            {
                wows.map(wow => (
                    <Wow wow={wow} />
                ))
            }
        </div>
    )

}