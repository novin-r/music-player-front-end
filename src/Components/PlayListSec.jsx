import React, {useState} from 'react'
import styles from "./PlaylistSec.module.css";

function PlayListSec({playlist,playlistId ,setPlaylistid}) {

    const handleClick = () => {
        setPlaylistid(playlistId);
    };

  return (
    <div  className={styles.playlist} onClick={handleClick}>{playlist}</div>
  )
}

export default PlayListSec