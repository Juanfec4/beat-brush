import { FC, MouseEvent } from "react";
import "./styles.scss";
interface PrimaryButtonProps {
  text: string;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const PrimaryButton: FC<PrimaryButtonProps> = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="primary-button">
      {text}
    </button>
  );
};

export default PrimaryButton;
