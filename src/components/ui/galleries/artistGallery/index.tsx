import { FC } from "react";
import ArtistCard from "../../cards/artistCard";
import "./styles.scss";
interface ArtistGalleryProps {
  artistList: any[];
}
const ArtistGallery: FC<ArtistGalleryProps> = ({ artistList }) => {
  return (
    <div className="artist-gallery">
      <div className="artist-gallery__items">
        {artistList.map((artist, index: number) => {
          return (
            <div key={artist.id} className="artist-gallery__container">
              <ArtistCard artist={artist} rank={index + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistGallery;
