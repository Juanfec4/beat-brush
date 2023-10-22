import { ChangeEvent, FC } from "react";
import "./styles.scss";
interface TextInputProps {
  value: string;
  id: string;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TextInput: FC<TextInputProps> = ({ label, id, value, handleChange }) => {
  return (
    <span className="text-input">
      <label htmlFor={id} className="text-input__label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        className="text-input__field"
      />
    </span>
  );
};
export default TextInput;
