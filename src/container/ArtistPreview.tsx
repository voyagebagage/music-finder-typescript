import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Artist, LocationStateCustom } from "../Model";
import useLoading from "../useLoading";

// import { Artist } from "../Model";

type Props = {};

function ArtistPreview({}: Props) {
  const location = useLocation();
  const state = location.state as LocationStateCustom;
  const { uncompleteArtistInfo, artistListRes } = state;
  const { isLoading, setIsLoading } = useLoading();
  const [artistInfo, setArtistInfo] = useState<Artist>({});
  useEffect(() => {
    const mergeArtistInfo = () => {
      setArtistInfo({
        ...uncompleteArtistInfo,
        ...artistListRes,
      });
      setIsLoading(false);
      // setFinishLoading(true);
    };
    if (uncompleteArtistInfo) {
      mergeArtistInfo();
    }
  }, [uncompleteArtistInfo]);

  console.log("*************artistInfo:", state, artistInfo, artistListRes);

  return !isLoading ? (
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
  ) : (
    <p>is loading PRV</p>
  );
}

export default ArtistPreview;
