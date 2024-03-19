import { useDispatch } from "react-redux";
import { addErrors, removeError } from "../redux/slices/trains";

const useCustomValidation = () => {
  const dispatch = useDispatch();

  const validateData = (lineNumber: number, key: string, value: number) => {
    switch (key) {
      case "speed":
        if (!Number.isInteger(value) || value < 0) {
          dispatch(addErrors(`${lineNumber}_${key}`));
        } else {
          dispatch(removeError(`${lineNumber}_${key}`));
        }
        break;
      case "force":
        if (typeof value !== "number" || value <= 0) {
          dispatch(addErrors(`${lineNumber}_${key}`));
        } else {
          dispatch(removeError(`${lineNumber}_${key}`));
        }
        break;
      case "engineAmperage":
        if (!Number.isInteger(value) || value <= 0) {
          dispatch(addErrors(`${lineNumber}_${key}`));
        } else {
          dispatch(removeError(`${lineNumber}_${key}`));
        }
        break;
      default:
        break;
    }
  };

  return validateData;
};

export default useCustomValidation;
