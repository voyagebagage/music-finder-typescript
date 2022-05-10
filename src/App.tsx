import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, Params, useLocation, useParams } from "react-router-dom";
import "./App.css";
import ResList from "./components/ResList";
import SuggestionsDisplay from "./components/SuggestionsDisplay";
import {
  Artist,
  LocationParams,
  LocationStateCustom,
  Song,
  Suggestions,
} from "./Model";

type Props = {
  artistPreview: any;
  songPreview: any;
};
function App({ artistPreview, songPreview }: Props) {
  // const [artistName, setArtistName] = useState<String>("");
  const [search, setSearch] = useState<String>("");
  const [textInput, setTextInput] = useState<String>("");
  const [artistList, setArtistList] = useState<Array<Artist>>([]);
  const [songList, setSongList] = useState<Array<Song>>([]);
  // const [suggestionsArtist, setSuggestionsArtist] = useState<Array<string>>([]);
  // const [suggestionsSong, setSuggestionsSong] = useState<Array<string>>([]);
  const [artistInfo, setArtistInfo] = useState<Artist>({});

  let location = useLocation();
  const pathname = location.pathname as string;
  let params = useParams<Params<string>>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = await response.json();
        console.log("RES", res);
        const artistMatch: Artist[] = await res.results.filter((r: any) =>
          r.artistName.includes(search)
        );
        // let uniqArtistMatch: any = [...new Set(artistMatch)];
        // console.log("uniqArtistMatch", uniqArtistMatch);

        const uniqArtistList: any[] = [
          ...new Map(artistMatch.map((r: any) => [r["artistId"], r])).values(),
        ];
        console.log("uniqArtistList", uniqArtistList);

        //set Artist list
        setArtistList(uniqArtistList);

        //set suggestions for artists
        // setSuggestionsArtist(
        //   uniqArtistList.map((name: any) => name.artistName)
        // );

        const songMatch: Song[] = await res.results.filter((r: any) =>
          r.trackName.includes(search)
        );
        console.log("songMatch0", songMatch);

        let uniqTrackList: any[] = [
          ...new Map(
            songMatch.map((song: any) => [song["trackId"], song])
          ).values(),
        ];
        console.log(uniqTrackList, "uniqTrackList");

        //set Song list
        setSongList(uniqTrackList);

        // Set suggestions for tracks
        // setSuggestionsSong(uniqTrackList.map((song: any) => song.trackName));
      } catch (e: any) {
        console.log("Error @ search:  ", e);
      }
    };
    fetchData();
  }, [search]);

  console.log("artistList", artistList);
  console.log("songList", songList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      let myTextInput: string[] = textInput.split(" ");
      let element: string[] = [];
      for (let i = 0; i < myTextInput.length; i++) {
        element.push(
          myTextInput[i].charAt(0).toUpperCase() + myTextInput[i].slice(1)
        );
      }
      setArtistList([]);
      setSongList([]);
      setSearch(element.join(" "));
    }
    inputRef.current?.blur();
  };
  return (
    <div className="App">
      <header className="App-header">
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "inherit" }}
          onClick={() => {
            setArtistList([]);
            setSongList([]);
            setArtistInfo({});
            setSearch("");
            // setTextInput("");
          }}
        >
          Music-finder
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          name="search"
          id="0001"
          onChange={(e) => setTextInput(e.target.value)}
          // value={textInput||""}
        />
        <input type="submit" value="search" />
      </form>
      {pathname.includes(`/artist/${params.artistId}`) ||
      pathname.includes(`/song/${params.songId}`) ? (
        <Outlet />
      ) : songList.length || artistList.length ? (
        <SuggestionsDisplay
          artistList={artistList}
          songList={songList}
          artistPreview={artistPreview}
          songPreview={songPreview}
          artistInfo={artistInfo}
          setArtistInfo={setArtistInfo}
        />
      ) : null}
    </div>
  );
}

export default App;
