import { FC, useEffect, useState } from "react";
import "./styles.scss";
import useStore from "../../zustand/store";
import useMusicData from "../../hooks/useMusicData";
import Receipt from "../../components/ui/misc/receipt";
import TimeFrameMenu from "../../components/ui/menus/timeFrameMenu";
import ColorSwatch from "../../components/ui/misc/colorSwatch";
import { ColorResult } from "react-color";
import { toBlob } from "html-to-image";
import PrimaryButton from "../../components/ui/buttons/primaryButton";
import { saveAs } from "file-saver";
import TextInput from "../../components/form/textInput";
const ReceiptsPage: FC = () => {
  const [tracks, setTracks]: any[] = useState(undefined);
  const [receiptColor, setReceiptColor] = useState("#fff");
  const [receiptTitle, setReceiptTitle] = useState("");
  const state = useStore();
  const { timeFrame, handleToggleTimeFrame } = useMusicData();

  const timeFrameMap: { [key: string]: string } = {
    long_term: "last year",
    medium_term: "last 6 months",
    short_term: "last month",
  };

  const handleDownload = () => {
    const node: HTMLElement | null = document.getElementById("receipt");
    if (node) {
      toBlob(node).then((blob) => {
        if (blob) {
          saveAs(blob, "receipt.png");
        } else {
          console.error("Blob is null. Cannot save it.");
        }
      });
    }
  };

  useEffect(() => {
    if (!state.userDetails) {
      state.fetchUserDetails();
    }
  }, [state.userDetails]);

  useEffect(() => {
    setTracks(state.topTracks);
  }, [state.topTracks]);
  return (
    <div className="receipts">
      <section className="receipts__title-section">
        <h1 className="receipts__title">Receipt Generator</h1>
        <p className="receipts__description-text">
          Generate, spotify receipts based on your user statistics. Customize
          the appearance, and share with friends.
        </p>
      </section>
      <section className="receipts__generator-section">
        <div className="receipts__generator-output">
          {tracks && state.userDetails ? (
            <div id="receipt">
              <Receipt
                username={state.userDetails.display_name}
                title={receiptTitle}
                color={receiptColor}
                tracks={tracks}
                timeFrame={timeFrameMap[timeFrame]}
              />
            </div>
          ) : null}
        </div>
        <div className="receipts__generator-controls">
          <h2 className="receipts__generator-title">Customization</h2>
          <div className="receipts__controls-top">
            <div className="receipts__controls-container">
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
            <div className="receipts__controls-container">
              <h5 className="overview__title">Background color:</h5>
              <ColorSwatch
                color={receiptColor}
                handleColorChange={(color: ColorResult) =>
                  setReceiptColor(color.hex)
                }
              />
            </div>
          </div>
          <TextInput
            id={"title-change"}
            label={"Choose your receipt's title:"}
            value={receiptTitle}
            handleChange={(e) => setReceiptTitle(e.target.value)}
          />
          <PrimaryButton text={"Download PNG"} handleClick={handleDownload} />
        </div>
      </section>
    </div>
  );
};
export default ReceiptsPage;
