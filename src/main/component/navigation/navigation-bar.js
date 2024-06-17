import React, { useState } from "react";
import RandomWowSearch from "../random-search/random-wow-search";
import OrderedWowSearch from "../ordered-search/ordered-wow-search";

export default function NavigationBar() {

    const [view, setView] = useState('random')

    function chooseComponent() {
        if (view === 'ordered') {
            return <OrderedWowSearch />
        } else if (view === 'settings') {
            // return <Settings />
            return <RandomWowSearch />
        } else {
            return <RandomWowSearch />
        }
    }

    return (
        <>
            <div id="navigation">
                <button id="random-nav-button" onClick={() => setView('random')}>Random</button>
                <button id="ordered-nav-button" onClick={() => setView('ordered')}>Ordered</button>
                <button id="settings-nav-button" onClick={() => setView('settings')}>Settings</button>
            </div>
            <div>
                { chooseComponent() }
            </div>
        </>
    )

}