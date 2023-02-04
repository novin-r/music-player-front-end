import React, {useEffect} from "react";
import Songs from "./Songs";
import './style.css';
const axios = require('axios');


function MainPlayer({setSongs, songs, PlaylistSongs,PlayNow, setCurrentSong, selectedPlaylisted, playlistid}) {
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
                <div className="player_row">
                    <Songs songs={songs} selectedPlaylisted={selectedPlaylisted} PlaylistSongs={PlaylistSongs} PlayNow={PlayNow} setCurrentSong={setCurrentSong} />
                </div>
            </div>
        </>
    );
}

export default MainPlayer