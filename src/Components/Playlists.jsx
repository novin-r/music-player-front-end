import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Songs from './Songs';
import styles from "./Playlist.module.css";
import PlayListSec from './PlayListSec';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const axios = require('axios');

const Playlist = ({setPlaylistid, setselectePlaylist}) => {
    //all playlists
    const [playlists, setPlaylists] = useState([]);

    const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);
    const [inputValue, setInputValue] = useState('');

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

    // CREATE PLAYLIST MODAL

    const handleOpenCreatePlaylist = () => {
        setOpenCreatePlaylist(true);
    };

    const handleCloseCreatePlaylist = () => {
        setOpenCreatePlaylist(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCreatePlaylist = () => {        
        const data = {
            playListName: inputValue,
        };
        
        axios.post('http://127.0.0.1:8000/api/playlists/create', data, {
        headers: { 
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

        setOpenCreatePlaylist(false);
    };


    return (
        <>
            <ul className={styles.cards}>
                <li onClick={handleOpenCreatePlaylist}>
                    <div className={styles.card__header}>
                        <h3 className={styles.card__title}>Create Playlist ....</h3>  
                    </div>
                </li>
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
            <Modal className="createplaylistmodal" open={openCreatePlaylist} onClose={handleCloseCreatePlaylist}>
                <div style={{ padding: '20px' }}>
                    <TextField
                        label="Enter something"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="createplaylist-input"
                    />
                    <Button className="createplaylist-button" variant="contained" color="primary" onClick={handleCreatePlaylist}>
                        Create
                    </Button>
                </div>
            </Modal>
        </>

    );
};

export default Playlist;