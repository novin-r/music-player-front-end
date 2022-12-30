import React from "react";
import Playlist from "./Playlist";
import PlayListSec from "./PlayListSec";
import './style.css';

function MainPlayer() {
    return (
        <>
            <div>
                <div className="musicoker-container">
                    <div className="player_row">
                        <section className="playlist_section">
                            <PlayListSec />
                        </section>
                        <Playlist/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer