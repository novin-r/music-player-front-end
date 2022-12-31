import React, {useEffect, useState} from "react";
import Playlist from "./Playlist";
import PlayListSec from "./PlayListSec";
import './style.css';
const axios = require('axios');

function MainPlayer() {
    const [playlists, setPlaylists] = useState([]);


    useEffect(() => {
        axios.get('/api/playlists').then(res => {
            if (res.data.status === 200) {
                setPlaylists(res.data.playlists);
            }
        });
    }, []);




    return (
        <>
            <div>
                <div className="musicoker-container">
                    <div className="player_row">
                        <section className="playlist_section">
                            <div className="create_new_playlist">Create New Playlist</div>
                            {playlists.map((item) => (
                                <PlayListSec key={item.id} playlist={item.playListName} playlistId={item.id} />
                            ))}
                        </section>
                        <Playlist/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer