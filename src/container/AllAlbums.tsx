import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { Album } from "../Model";

type Props = {};

const AllAlbums = (props: Props) => {
  const params = useParams<Params<string>>();
  const { artistId } = params;
  const [albumList, setAlbumList] = useState<Array<Album>>([]);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?id=${artistId}&entity=album`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = await response.json();
        setAlbumList(await res.results.slice(1));
        console.log("RES", res);
      } catch (error: any) {
        console.log("error in all albums:", error);
      }
    };
    fetchAlbums();
  }, [artistId]);
  console.log(albumList);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5%",
      }}
    >
      {albumList.map((album: Album) => (
        <div
          className="album-preview-wrapper"
          key={album?.collectionCensoredName}
        >
          <div className="album-preview-info-name">{album?.collectionName}</div>
          <img
            src={album.artworkUrl100 || album?.artistViewUrl}
            className="album-img-preview"
          />
        </div>
      ))}
    </div>
  );
};

export default AllAlbums;
