import axios from "axios";
import { FC, useEffect, useState } from "react";
import { calculateExpiresAt } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import useStore from "../../zustand/store";
type Code = string;

const AuthPage: FC = () => {
  const [code, setCode] = useState<Code | null>(null);
  const [verified, setVerified] = useState<Boolean>(false);
  const navigator = useNavigate();
  const state = useStore();
  //Set variables on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code") && !code) {
      setCode(urlParams.get("code"));
    }
  }, []);

  //Get access token
  useEffect(() => {
    if (code) {
      //Get code verifier from storage
      let codeVerifier = sessionStorage.getItem("spotify-code-verifier");
      //Request body
      const body = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier,
      };

      //Config
      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      //Request
      axios
        .post("https://accounts.spotify.com/api/token", body, config)
        .then((response) => {
          //Save tokens
          sessionStorage.setItem(
            "spotify-access-token",
            response.data.access_token
          );

          sessionStorage.setItem(
            "spotify-expires-at",
            String(calculateExpiresAt(response.data.expires_in))
          );

          //Remove code verifier
          sessionStorage.removeItem("spotify-code-verifier");

          //Set state to verified
          setVerified(true);
          state.setAuthenticated(true);
        });
    }
  }, [code]);

  //Redirect to overview page once log-in is successful
  useEffect(() => {
    if (verified) {
      setTimeout(() => navigator("../receipts"), 500);
    }
  }, [verified]);

  return (
    <div className="auth">
      {verified ? (
        <h1 className="auth__message--success">Login successful</h1>
      ) : (
        <h1 className="auth__message">Loading...</h1>
      )}
    </div>
  );
};

export default AuthPage;
