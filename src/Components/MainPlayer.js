import React from "react";
import Playlist from "./Playlist";
import './style.css';

function MainPlayer() {
    return (
        <>
            <div>
                <div className="musicoker-container">
                    <div className="player_row">
                        <Playlist/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer