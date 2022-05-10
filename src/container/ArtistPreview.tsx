// import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationStateCustom } from "../Model";

// import { Artist } from "../Model";

type Props = {};

function ArtistPreview({}: Props) {
  const location = useLocation();
  const state = location.state as LocationStateCustom;
  const { artistInfo } = state;
  // const artistFullObject = { ...artistInfo, ...artistListRes };
  // const [artistFullKeys, setSetArtistFullKeys] = useState<Artist>();

  // useEffect(
  //   () => setSetArtistFullKeys({ ...artistFullObject }),

  //   [artistFullKeys?.artistId]
  // );

  // console.log("state:FROM", state.artistListRes.artworkUrl100);
  // console.log("*************keys:", artistFullKeys);
  // console.log("*************Object:", artistFullObject);
  console.log("*************artistInfo:", artistInfo);
  // console.log("state:FROM", artistInfo.artistName, artistListRes, artistListRes.artworkUrl100);

  return (
    <div className="preview-wrapper">
      <img src={artistInfo?.artworkUrl100} className="img-preview" />
      <p className="preview-info-wrapper">
        <span className="preview-info-name">{artistInfo?.artistName}</span>
        <span className="preview-info-genre">
          Genre : {artistInfo?.primaryGenreName}
        </span>
        <span className="preview-info-releases">
          Releases : {artistInfo?.trackCount}
        </span>
        <span className="preview-info-more">
          <Link
            to={`artist/${artistInfo?.artistId}/${artistInfo?.amgArtistId}`}
          >
            See Songs
          </Link>
        </span>
        <span className="preview-info-more">
          <a href={`${artistInfo?.artistLinkUrl}`} target="_blank">
            see in apple music
          </a>
        </span>
      </p>
    </div>
  );
}

export default ArtistPreview;
