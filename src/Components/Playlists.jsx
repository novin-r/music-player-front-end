import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Songs from './Songs';
import styles from "./Playlist.module.css";
import PlayListSec from './PlayListSec';

const axios = require('axios');

const Playlist = ({setPlaylistid, setselectePlaylist}) => {
    //all playlists
    const [playlists, setPlaylists] = useState([]);

    //fetch all playlists
    useEffect(() => {
        axios.get('/api/playlists').then(res => {
            if (res.data.status === 200) {
                setPlaylists(res.data.playlists);
            }
        });
    }, []);

    const handlePlaylistPlay = (id) => {
        axios.put(`/api/playlists/${id}/last-listened`)
    };


    return (
        <ul className={styles.cards}>
            {playlists.map(playlist => (
                <Link key={playlist.id} to={`./songs`}>
                    <PlayListSec 
                        key={playlist.id} 
                        playlist={playlist.playListName} 
                        playlistId={playlist.id} 
                        setPlaylistid={setPlaylistid} 
                        setselectePlaylist={setselectePlaylist}
                        onPlay={() => handlePlaylistPlay(playlist.id)}
                    />
                </Link>

            ))}
        </ul>
    );
};

export default Playlist;