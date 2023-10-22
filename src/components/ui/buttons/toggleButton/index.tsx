import { FC } from "react";

import "./styles.scss";
import { formatStringOption } from "../../../../utilities/helpers";
interface ToggleButtonProps {
  handleToggle: (option: string) => void;
  active: string;
  options: string[];
}

const ToggleButton: FC<ToggleButtonProps> = ({
  handleToggle,
  active,
  options,
}) => {
  return (
    <div className="toggle-buttons">
      {options.map((option) => {
        return (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={
              active === option
                ? "toggle-buttons__option--active"
                : "toggle-buttons__option"
            }
          >
            {formatStringOption(option)}
          </button>
        );
      })}
    </div>
  );
};
export default ToggleButton;
