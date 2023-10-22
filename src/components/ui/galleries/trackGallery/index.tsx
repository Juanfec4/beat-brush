import { FC } from "react";
import TrackCard from "../../cards/trackCard";

import "./styles.scss";
interface TrackGalleryProps {
  trackList: any[];
}
const TrackGallery: FC<TrackGalleryProps> = ({ trackList }) => {
  return (
    <div className="track-gallery">
      <div className="track-gallery__items">
        {trackList.map((track, index: number) => {
          return (
            <div key={track.id} className="track-gallery__container">
              <TrackCard track={track} rank={index + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackGallery;
