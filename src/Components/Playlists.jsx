import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Songs from './Songs';
import styles from "./Playlist.module.css";

const axios = require('axios');

const Playlist = () => {
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
                //i want to have div, and link them to Songs component 
                <Link key={playlist.id} to={`./songs`}>
                    <li>
                        <div className={styles.card__header}>
                            <img className={styles.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
                            <div className={styles.card__header}>
                                <h3 className={styles.card__title}>{playlist.playListName}</h3>            
                            </div>
                        </div>
                    </li>
                </Link>

            ))}
        </ul>
    );
};

export default Playlist;