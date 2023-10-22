import { FC } from "react";
import "./styles.scss";
import Navbar from "../../components/layout/navbar";
const ErrorPage: FC = () => {
  return (
    <div>
      <Navbar />
      <h1 className="error__title">
        The content you are looking for is currently unavailable.
      </h1>
    </div>
  );
};
export default ErrorPage;
