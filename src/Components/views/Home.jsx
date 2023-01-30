import React from "react";
import Playlist from "../Playlist";

import {library} from "@fortawesome/fontawesome-svg-core";
import '../style.css';
import {
    faFacebook, faLinkedin, faGithub, faLaravel, faReact
} from "@fortawesome/free-brands-svg-icons";
import Playlist from "../Playlists";

library.add(faFacebook, faLinkedin, faGithub, faLaravel, faReact);

function Home() {
    return (
        <div className="musicoker-container">
            <Playlist />
        </div>
    );
}

export default Home