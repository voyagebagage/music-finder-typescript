import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lyrics from "../components/Lyrics";
import { LocationStateCustom } from "../Model";

type Props = {};

function Song({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { url, artistName, trackName } = location.state as LocationStateCustom;
  console.log("URL", artistName, trackName);

  return (
    <div className="song-page-wrapper">
      <a onClick={() => navigate(-1)}>Go Back</a>
      SONG
      <p className="apple-preview">
        <a href={url} target="_blank">
          listen to it on apple music
        </a>
      </p>
      <Lyrics artist={artistName} title={trackName} />
    </div>
  );
}

export default Song;
