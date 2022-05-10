import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

const Allbums = (props: Props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
      <Link to="all"> all Allbums</Link>
      <Link to="top5">Top5</Link>
      <Outlet />
    </div>
  );
};

export default Allbums;
