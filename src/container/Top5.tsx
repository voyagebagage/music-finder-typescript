import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { Album } from "../Model";
type Props = {};

const Top5 = (props: Props) => {
  const params = useParams<Params<string>>();
  const { amgArtistId } = params;
  console.log("amgArtistId", amgArtistId);

  const [top5, setTop5] = useState<Array<Album>>([]);
  useEffect(() => {
    const fetchTop5 = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?amgArtistId=${amgArtistId},5723&entity=album&limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = await response.json();
        setTop5(await res.results.slice(1, 6));
        console.log("RES", res.results.slice(1, 6));
      } catch (error: any) {
        console.log("error in top 5:", error);
      }
    };
    fetchTop5();
  }, [amgArtistId]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5%",
      }}
    >
      {top5.map((album: Album) => (
        <div
          className="album-preview-wrapper"
          key={album?.collectionCensoredName}
        >
          <div className="album-preview-info-name">{album?.collectionName}</div>
          <img
            src={
              // album.collectionViewUrl ||
              album.artworkUrl100 || album.artistViewUrl
            }
            className="album-img-preview"
          />
        </div>
      ))}
    </div>
  );
};

export default Top5;
