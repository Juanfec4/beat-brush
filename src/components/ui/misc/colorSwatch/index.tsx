import { FC } from "react";
import { CirclePicker, ColorResult } from "react-color";

interface ColorSwatchProps {
  color: string;
  handleColorChange: (color: ColorResult) => void;
}

const ColorSwatch: FC<ColorSwatchProps> = ({ color, handleColorChange }) => {
  return (
    <CirclePicker
      color={color}
      onChangeComplete={handleColorChange}
      colors={[
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
        "#ffffff",
        "#607d8b",
      ]}
    />
  );
};
export default ColorSwatch;
