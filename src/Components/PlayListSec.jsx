import React, {useState} from 'react'
import styles from "./Playlist.module.css";

function PlayListSec({playlist,playlistId ,setPlaylistid, setselectePlaylist, onPlay}) {

    const handleClick = () => {
        setPlaylistid(playlistId);
        setselectePlaylist(playlist);
        onPlay();
    };

  return (
    <>
      <li onClick={handleClick}>
        <div className={styles.card__header}>
          <img className={styles.card__thumb} src="http://localhost:3000/static/media/default.82d306f1.jpg" alt="" />
          <div className={styles.card__header}>
            <h3 className={styles.card__title}>{playlist}</h3>          
          </div>
        </div>
      </li>
    </>
  )
}

export default PlayListSec