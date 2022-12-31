import React, {useEffect, useState} from "react";
import Playlist from "./Playlist";
import PlayListSec from "./PlayListSec";
import './style.css';
const axios = require('axios');

function MainPlayer() {
    //all playlists
    const [playlists, setPlaylists] = useState([]);
    //Array of all music
    const [songs, setSongs] = useState([]);
    const [playlistid, setPlaylistid] = useState();


    //fetch all playlists
    useEffect(() => {
        axios.get('/api/playlists').then(res => {
            if (res.data.status === 200) {
                setPlaylists(res.data.playlists);
            }
        });
    }, []);

    useEffect(() => {
        axios.get('/api/playlist/songs/'+playlistid).then(res => {
            setSongs(res.data);
        });
    },[playlistid]);

    // If u want to fetch all the musics
    // useEffect(() => {
    //     axios.get('/api/songs').then(res => {
    //         if (res.data.status === 200) {
    //             setSongs(res.data.songs);
    //         }
    //     });
    // }, []);


    return (
        <>
            <div>
                <div className="musicoker-container">
                    <div className="player_row">
                        <section className="playlist_section">
                            <div className="create_new_playlist">Create New Playlist</div>
                            {playlists.map((item) => (
                                <PlayListSec key={item.id} playlist={item.playListName} playlistId={item.id} setPlaylistid={setPlaylistid} />
                            ))}
                        </section>
                        <Playlist songs={songs}  />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer