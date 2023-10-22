import { FC } from "react";
import receiptBackground from "../../../../assets/images/receipt.svg";
// import qrCode from "../../../../assets/images/qr-code.png";
import spotify from "../../../../assets/images/spotify.png";
import "./styles.scss";
import {
  formatTimestamp,
  generateRandomPaddedNumber,
  hexToRgba,
  msToHMS,
} from "../../../../utilities/helpers";

interface ReceiptProps {
  username: string;
  title: string;
  tracks: any[];
  timeFrame: string;
  color: string;
}
const Receipt: FC<ReceiptProps> = ({
  username,
  title,
  tracks,
  timeFrame,
  color,
}) => {
  let totalTime = 0;
  let rgbaColor = hexToRgba(color, 0.2);
  return (
    <div className="receipt">
      <img src={receiptBackground} className="receipt__background" />
      <div className="receipt__content-container">
        <div
          className="receipt__content-overlay"
          style={{ backgroundColor: rgbaColor }}
        >
          <h2 className="receipt__title">{title ? title : "Beat Brush"}</h2>
          <div className="receipt__header">
            <p className="receipt__sub-title">
              ORDER #{generateRandomPaddedNumber(1, 999)} - {timeFrame}
            </p>
            <p className="receipt__sub-title">{formatTimestamp(Date.now())}</p>
          </div>
          <div className="receipt__table-container">
            <table className="receipt__table">
              <thead className="receipt__table-head">
                <tr className="receipt__table-row">
                  <th className="receipt__table-header">#</th>
                  <th className="receipt__table-header">TRACK</th>
                  <th className="receipt__table-header">AMT</th>
                </tr>
              </thead>
              <tbody className="receipt__table-body">
                {tracks.map((track, index) => {
                  totalTime += index < 10 ? track.duration_ms : 0;
                  return index < 10 ? (
                    <tr className="receipt__table-row" key={track.id}>
                      <td className="receipt__table-data">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </td>
                      <td className="receipt__table-data">
                        {track.name} - {""}
                        {track.artists.map((artist: any, index: number) => {
                          return index + 1 !== track.artists.length
                            ? `${artist.name}, `
                            : artist.name;
                        })}
                      </td>
                      <td className="receipt__table-data">
                        {msToHMS(Number(track.duration_ms))}
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
          <div className="receipt__summary-container">
            <span className="receipt__summary-element">
              <p className="receipt__data">TRACK COUNT:</p>
              <p className="receipt__data">10</p>
            </span>
            <span className="receipt__summary-element">
              <p className="receipt__data">TOTAL:</p>
              <p className="receipt__data">{msToHMS(Number(totalTime))}</p>
            </span>
          </div>
          <div className="receipt__payment-container">
            <span className="receipt__payment-element">
              <p className="receipt__data">CARD:</p>
              <p className="receipt__data">
                **** **** **** *{generateRandomPaddedNumber(1, 999)}
              </p>
            </span>
            <span className="receipt__payment-element">
              <p className="receipt__data">CARDHOLDER:</p>
              <p className="receipt__data">{username}</p>
            </span>
          </div>
          <div className="receipt__footer-container">
            {/* <img className="receipt__qr" src={qrCode} /> */}
            <div className="receipt__footer-sub-section">
              <img className="receipt__spotify" src={spotify} />
              <p className="receipt__footer-text"> Using the spotify api</p>
              <p className="receipt__footer-text"> Powered by beat brush</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Receipt;
