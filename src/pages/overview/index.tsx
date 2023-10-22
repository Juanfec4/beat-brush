import { FC } from "react";
import useMusicData from "../../hooks/useMusicData";
import TrackGallery from "../../components/ui/galleries/trackGallery";
import ArtistGallery from "../../components/ui/galleries/artistGallery";
import ToggleButton from "../../components/ui/buttons/toggleButton";
import TimeFrameMenu from "../../components/ui/menus/timeFrameMenu";

import "./styles.scss";
import useStore from "../../zustand/store";

const OverviewPage: FC = () => {
  const state = useStore();
  const {
    selectedGallery,
    timeFrame,
    handleToggleGallery,
    handleToggleTimeFrame,
  } = useMusicData();
  return (
    <div className="overview">
      <div className="overview__content">
        <section className="overview__controls">
          <div>
            <h5 className="overview__title">Show:</h5>
            <ToggleButton
              handleToggle={handleToggleGallery}
              options={["tracks", "artists"]}
              active={selectedGallery}
            />
          </div>
          <div>
            <h5 className="overview__title">Timeframe:</h5>
            <TimeFrameMenu
              handleToggle={handleToggleTimeFrame}
              options={[
                { value: "long_term", text: "1 year" },
                { value: "medium_term", text: "6 months" },
                { value: "short_term", text: "4 weeks" },
              ]}
              active={timeFrame}
            />
          </div>
        </section>
        <section className="overview__gallery">
          <h1 className="overview__gallery-title">
            Your top {selectedGallery}
          </h1>
          {selectedGallery === "tracks" ? (
            <TrackGallery trackList={state.topTracks} />
          ) : null}
          {selectedGallery === "artists" ? (
            <ArtistGallery artistList={state.topArtists} />
          ) : null}
        </section>
      </div>
    </div>
  );
};
export default OverviewPage;
