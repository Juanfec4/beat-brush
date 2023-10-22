import { FC } from "react";

import "./styles.scss";
interface ArtistCardProps {
  artist: any;
  rank: number | null;
}
const ArtistCard: FC<ArtistCardProps> = ({ artist, rank }) => {
  return (
    <div className="artist-card">
      <img src={artist.images[1].url} className="artist-card__image" />
      <span className="artist-card__overlay">
        <h3 className="artist-card__name">
          {rank ? `${rank}. ` : null}
          {artist.name}
        </h3>
      </span>
    </div>
  );
};

export default ArtistCard;
