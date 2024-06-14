import React from "react";

export default function NavigationBar({ currentPath }) {

    return (
        <div id="navigation">
            <button id="random-nav-button">Random</button>
            <button id="ordered-nav-button">Ordered</button>
            <button id="settings-nav-button">Settings</button>
        </div>
    )

}