import React from "react";
import Playlist from "../Playlists";

import {library} from "@fortawesome/fontawesome-svg-core";
import '../style.css';
import {
    faFacebook, faLinkedin, faGithub, faLaravel, faReact
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faLinkedin, faGithub, faLaravel, faReact);

function Home({setPlaylistid, setselectePlaylist}) {
    return (
        <div className="melodytrip-container">
            <Playlist setPlaylistid={setPlaylistid} setselectePlaylist={setselectePlaylist} />
        </div>
    );
}

export default Home