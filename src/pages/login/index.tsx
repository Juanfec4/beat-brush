import { FC } from "react";
import SpotifyLogin from "../../components/ui/buttons/spotifyLogin";
import "./styles.scss";
const LoginPage: FC = () => {
  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Please login to spotify to continue</h1>
        <SpotifyLogin />
      </div>
    </div>
  );
};
export default LoginPage;
