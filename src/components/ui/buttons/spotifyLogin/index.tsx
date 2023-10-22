import { FC } from "react";
import {
  getAuthUrl,
  pkceChallengeFromVerifier,
  makeId,
} from "../../../../utilities/helpers";

import "./styles.scss";
const SpotifyLogin: FC = () => {
  //Handle login
  const handleSpotifyLogin = () => {
    //Generate code and hash
    const codeVerifier: string = makeId(64);
    pkceChallengeFromVerifier(codeVerifier).then((codeChallenge: string) => {
      //Save code to local storage
      sessionStorage.setItem("spotify-code-verifier", codeVerifier);
      //Auth url
      const authUrl = getAuthUrl(codeChallenge);
      //Open spotify auth page
      window.location.href = authUrl;
    });
  };
  return (
    <button onClick={handleSpotifyLogin} className="login__button">
      Spotify login
    </button>
  );
};
export default SpotifyLogin;
