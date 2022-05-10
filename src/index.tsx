import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
//pages
import ArtistPreview from "./container/ArtistPreview";
import SongPreview from "./container/SongPreview";
import Song from "./container/Song";
import Artist from "./container/Artist";
import Albums from "./container/Albums";
import Top5 from "./container/Top5";
import LastReleases from "./container/LastReleases";
import AllAlbums from "./container/AllAlbums";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <App
            artistPreview={<ArtistPreview />}
            songPreview={<SongPreview />}
          />
        }
      >
        <Route path={"artist/:artistId/:amgArtistId"} element={<Artist />}>
          <Route path="albums" element={<Albums />}>
            <Route path="top5" element={<Top5 />} />
            <Route path="all" element={<AllAlbums />} />
          </Route>
          <Route path="last-releases" element={<LastReleases />} />
          <Route path="videos"></Route>
        </Route>
        <Route path="song/:songId" element={<Song />} />

        <Route path="preview/:artistId" element={<ArtistPreview />} />
        <Route path="preview/:songId" element={<SongPreview />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
