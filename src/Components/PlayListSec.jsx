import React, {useState} from 'react'
import styles from "./PlaylistSec.module.css";

function PlayListSec({playlist,playlistId}) {
    const [playlistid, setPlaylistid] = useState(playlistId);

  return (
    <div  className={styles.playlist}>{playlist}</div>
  )
}

export default PlayListSec