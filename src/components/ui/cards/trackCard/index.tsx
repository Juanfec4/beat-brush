import { FC } from "react";
import { msToHMS } from "../../../../utilities/helpers";

import "./styles.scss";
interface TrackCardProps {
  track: any;
  rank: number | null;
}
const TrackCard: FC<TrackCardProps> = ({ track, rank }) => {
  return (
    <div className="track-card">
      {rank ? (
        <div className="track-card__rank-container">
          <p className="track-card__rank">{rank}</p>
        </div>
      ) : null}
      <div className="track-card__image-container">
        <img src={track.album.images[2].url} className="track-card__image" />
      </div>
      <div className="track-card__text-container">
        <h3 className="track-card__name">{track.name}</h3>
        <h5 className="track-card__artist">
          {track.artists.map((artist: any, index: number) => {
            return (
              <span key={artist.id}>
                {artist.name}
                {index === track.artists.length - 1 ? "" : " - "}
              </span>
            );
          })}
        </h5>
        <span className="track-card__duration">
          {msToHMS(Number(track.duration_ms))}
        </span>
      </div>
    </div>
  );
};

export default TrackCard;
