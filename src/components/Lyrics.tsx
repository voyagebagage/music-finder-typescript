import React, { useEffect, useState } from "react";

type Props = {
  artist: string;
  title: string;
};

const Lyrics = ({ artist, title }: Props) => {
  const [lyrics, setLyrics] = useState<string>("");
  useEffect(() => {
    try {
      const fetchLyrics: Function = async () => {
        // let myHeaders = new Headers();

        // let myInit = {
        //   method: "GET",
        //   headers: myHeaders,
        //   mode: "cors",
        //   cache: "default",
        // };

        const response = await fetch(
          `https://api.lyrics.ovh/v1/${artist}/${title}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
          // {
          //   // crossDomain:true,
          //   // method: "GET",
          //   headers: {
          //     // "Content-Type": "application/json",
          //     // Accept: "application/json",
          //     "Access-Control-Allow-Origin": "*",
          //   },
          // }
          // {
          //   method: "GET",
          //   headers: myHeaders,
          //   mode: "no-cors",
          //   cache: "default",
          // }
        );

        const res = await response.json();
        console.log(res, "55555");
        setLyrics(await res.lyrics);
      };
      fetchLyrics();
    } catch (error: any) {
      console.log("error in Lyrics:", error);
    }
  }, [artist, title]);

  return <p className="lyrics">{lyrics}</p>;
};

export default Lyrics;
