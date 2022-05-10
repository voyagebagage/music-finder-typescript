import { useLocation, Link } from "react-router-dom";
import { LocationStateCustom } from "../Model";

type Props = {};

const SongPreview = (props: Props) => {
  const location = useLocation();
  const state = location.state as LocationStateCustom;
  const { songInfo } = state;
  const { previewUrl, artistName, trackName } = songInfo;
  console.log("state songPreview:", songInfo);
  return (
    <div className="preview-wrapper">
      <img
        src={
          songInfo.trackViewUrl ||
          songInfo.collectionViewUrl ||
          songInfo?.artworkUrl100
        }
        className="img-preview"
      />
      <p className="preview-info-wrapper">
        {/* <span className="artist-name"></span> */}
        <span className="preview-trackName">
          {songInfo?.trackName} of {songInfo?.artistName.split("&")[0]}
        </span>
        <span className="preview-time-length">
          in album: {songInfo?.collectionName.split("-" || ":")[0]}
        </span>
        <span className="preview-time-length">
          released: {songInfo?.releaseDate.split("T")[0]}
        </span>
        <span className="preview-time-length">
          duration: {(songInfo?.trackTimeMillis / 60000).toFixed(2)} min, price:
          {songInfo?.collectionPrice} $
        </span>
        <span className="preview-genre">
          Genre: {songInfo?.primaryGenreName}
        </span>
        {/* <span className="artist-releases">Releases : {songInfo.trackCount}</span> */}
        {/* <span className="song-time-length"></span> */}
        <span className="preview-info-more">
          <Link
            to={`song/${songInfo?.trackId}`}
            state={{ url: previewUrl, artistName, trackName }}
          >
            Listen/ see lyrics
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SongPreview;
