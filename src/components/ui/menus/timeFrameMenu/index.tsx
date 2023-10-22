import { FC } from "react";

import "./styles.scss";

type option = {
  value: string;
  text: string;
};
interface TimeFrameMenuProps {
  handleToggle: (option: string) => void;
  active: string;
  options: option[];
}

const TimeFrameMenu: FC<TimeFrameMenuProps> = ({
  handleToggle,
  active,
  options,
}) => {
  return (
    <ul className="time-frame-menu">
      {options.map((option) => {
        return (
          <li key={option.value} className="time-frame-menu__item">
            <button
              onClick={() => handleToggle(option.value)}
              className={
                active === option.value
                  ? "time-frame-menu__button--active"
                  : "time-frame-menu__button"
              }
            >
              {option.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default TimeFrameMenu;
