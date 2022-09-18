import React from "react";
import Player from "./Player";
import Playlist from "./Playlist";
import './style.css';

function MainPlayer() {
    return (
        <>
            <div>
                <div className="musicoker-container">
                    <div className="row">
                        <Playlist/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer