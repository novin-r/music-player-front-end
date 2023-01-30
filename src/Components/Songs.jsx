import React, {useEffect, useRef, useState} from "react";
import Player from "./Player";
import Box from '@mui/material/Box';
import LinearProgress from "@material-ui/core/LinearProgress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import DefaultImg from '../assets/img/default.jpg';
import {faList} from "@fortawesome/free-solid-svg-icons";
import './style.css';

library.add(faList);
const axios = require('axios');


function Songs({songs,selectedPlaylisted,PlaylistSongs, PlayNow, setCurrentSong}) {
    const [Playlistloading, setPlaylistLoading] = useState(true);
    
    useEffect(()=>{
        axios.get('/api/song/latest').then(res => {
            if (res.data.status === 200) {
                setCurrentSong(res.data.song);
                setPlaylistLoading(false);
            }
        })
    },[]);

    let display_playlist = "";
    if (Playlistloading) {
        return (<div className="col-6 p-0">
            <div className="main-playlist p-2">
                    <LinearProgress />
            </div>
        </div>)
    } else {
        display_playlist = songs.map((song, index) => {
            return (
                <li key={song.id} onClick={() => PlayNow(index)} ref={el => (PlaylistSongs.current[index] = el)}
                    data-url={`http://localhost:8000` + song.hash_key} data-image={song.image}>
                    <span><img src={song.image ? `http://localhost:8000` + song.image : DefaultImg} alt=""/></span>
                    <span>
                        <span className="d-block">{song.name.replace(/\.[^/.]+$/, "")}</span>
                        <span className="text-muted">{song.album_artist}</span>
                    </span>
                    <span>{song.length.replace(/\.[^/.]+$/, "")}</span>
                </li>
            )
        });
    }

    return (
        <>
            {
                localStorage.getItem('auth_token') ? 
                <div>
                    <div>
                        <div className="main-playlist p-2">
                            <h6 className="text-center">
                                <FontAwesomeIcon icon="list"/>&nbsp;{selectedPlaylisted}</h6>
                            <div className="playlist-list">
                                <ul className="playlist-list-content">
                                    {display_playlist ?? ""}
                                </ul>
                            </div>
                        </div>
                    </div> 
            </div>: <div>Log In First</div>
            }
        
        </>
    );
}

export default Songs;
