import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { Song } from "../Model";
type Props = {};

const LastReleases = (props: Props) => {
  const params = useParams<Params<string>>();
  const { amgArtistId } = params;
  const [lastReleases, setLastReleases] = useState<Array<Song>>([]);
  useEffect(() => {
    const fetchLastRelease: Function = async () => {
      try {
        const response = await fetch(
          `  https://itunes.apple.com/lookup?amgArtistId=${amgArtistId},5723&entity=song&limit=5&sort=recent
          `,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = await response.json();
        setLastReleases(await res.results.slice(1, 6));
        console.log("RES", res);
      } catch (error: any) {
        console.log("error @ last releases", error);
      }
    };
    fetchLastRelease();
  }, [amgArtistId]);
  console.log(lastReleases);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5%",
      }}
    >
      {lastReleases.map((song: Song) => (
        <div className="album-preview-wrapper" key={song?.trackId}>
          <div className="album-preview-info-name">
            {song?.trackName} <strong>from album:</strong>
            {song?.collectionCensoredName}
          </div>
          <img
            src={
              // album.collectionViewUrl ||
              song.collectionViewUrl || song.artworkUrl100
            }
            className="album-img-preview"
          />
        </div>
      ))}
    </div>
  );
};

export default LastReleases;
