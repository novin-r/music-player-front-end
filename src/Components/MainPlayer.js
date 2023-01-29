import React, {useEffect, useState} from "react";
import Playlist from "./Playlist";
import PlayListSec from "./PlayListSec";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.css';
const axios = require('axios');


function MainPlayer() {
    //all playlists
    const [playlists, setPlaylists] = useState([]);
    //selected playlist
    const [selectedPlaylisted, setselectePlaylist] = useState();

    const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);
    const [inputValue, setInputValue] = useState('');

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

    const handlePlaylistPlay = (id) => {
        axios.put(`/api/playlists/${id}/last-listened`)
    };

    useEffect(() => {
        axios.get('/api/playlist/songs/'+playlistid).then(res => {
            setSongs(res.data);
        });
    },[playlistid]);

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
                            <div className="create_new_playlist" onClick={handleOpenCreatePlaylist} >Create New Playlist</div>
                            {playlists.map((item) => (
                                <PlayListSec 
                                    key={item.id} 
                                    playlist={item.playListName} 
                                    playlistId={item.id} 
                                    setPlaylistid={setPlaylistid} 
                                    setselectePlaylist={setselectePlaylist}
                                    onPlay={() => handlePlaylistPlay(item.id)}
                                />
                            ))}

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

                        </section>
                        <Playlist songs={songs} selectedPlaylisted={selectedPlaylisted} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPlayer