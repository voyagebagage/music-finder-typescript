import React, { useEffect, useState } from "react";
import { Artist, Song } from "../Model";
import "../App.css";
import { useNavigate, useParams, Params } from "react-router-dom";
import useLoading from "../useLoading";

type Props = {
  artistList: Artist[];
  songList: Song[];
  artistPreview: Artist;
  songPreview: any;
  // artistInfo: Artist;
  // setArtistInfo: React.Dispatch<React.SetStateAction<Artist>>;
};

const SuggestionsDisplay = ({
  artistList,
  songList,
  artistPreview,
  songPreview,
}: // artistInfo,
// setArtistInfo,
Props) => {
  let navigate = useNavigate();
  const [show, setShow] = useState<string>("");
  const params = useParams<Params<string>>();
  const { artistId } = params;

  const { isLoading, setIsLoading } = useLoading();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uncompleteArtistInfo, setUncompleteArtistInfo] = useState<Artist>({});
  const [finishLoading, setFinishLoading] = useState<boolean>(false);
  console.log("PARAMS =>//////", artistId);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://itunes.apple.com/lookup?id=${artistId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = await response.json();

        setUncompleteArtistInfo({
          ...res.results[0],
        });
        setIsLoading(false);
      };
      fetchData();
    } catch (e: any) {
      console.log("Error:  ", e);
    }
  }, [artistId]);
  //

  console.log(" ARTIST INFO INFO", finishLoading);
  console.log(" A artistList", artistList);

  return (
    <div className="suggestions-wrapper">
      {show === "artist" && artistPreview}
      {artistList.map((artist: Artist, index: number) => (
        <span
          className="single-suggestion"
          key={artist.artistId}
          onClick={() => {
            setShow("artist");
            navigate(
              `preview/${artist.artistId || uncompleteArtistInfo?.artistId}`,
              {
                state: {
                  artistListRes: artistList.filter(
                    (e: any) => e.artistId === artist.artistId
                  )[0],
                  uncompleteArtistInfo,
                  isLoading,
                  finishLoading,
                },
              }
            );
          }}
        >
          {artist.artistName}
        </span>
      ))}
      <div style={{ display: "flex", color: "yellow" }}>
        <p className="split-result"></p>Artists↑ ↓Songs
        <p className="split-result"></p>
      </div>
      {show === "song" && songPreview}
      {songList.map((song: any, index: number) => (
        <span
          className="single-suggestion"
          key={index}
          onClick={() => {
            setShow("song");
            navigate(`preview/${song.trackId}`, {
              state: {
                songInfo: songList.filter(
                  (e: Song) => e.trackId === song.trackId
                )[0],
              },
            });
          }}
        >
          {song.trackName}
        </span>
      ))}
    </div>
  );
};

export default SuggestionsDisplay;
