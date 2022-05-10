import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LocationStateCustom } from "../Model";

type Props = {};

function Artist({}: Props) {
  const location = useLocation();
  const state = location.state as LocationStateCustom;
  const navigate = useNavigate();

  console.log("state", state);

  return (
    <div className="artist-page-wrapper">
      <a onClick={() => navigate(-1)}> Go Back </a>
      Artist list songs
      <Link to="albums">Albums</Link>
      {/* <Link to="top5">Top5</Link> */}
      <Link to="last-releases">LastReleases</Link>
      <Link to="videos">Videos</Link>
      <Outlet />
      {/* <Link></Link> */}
    </div>
  );
}

export default Artist;
