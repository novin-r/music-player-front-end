import React, {useState} from 'react'
import styles from "./PlaylistSec.module.css";

function PlayListSec({playlist,playlistId ,setPlaylistid, setselectePlaylist, onPlay}) {

    const handleClick = () => {
        setPlaylistid(playlistId);
        setselectePlaylist(playlist);
        onPlay();
    };

  return (
    <div  className={styles.playlist} onClick={handleClick}>{playlist}</div>
  )
}

export default PlayListSec