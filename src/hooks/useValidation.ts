import { useDispatch } from "react-redux";
import { addErrors, removeError } from "../redux/slices/trains";

const useCustomValidation = () => {
  const dispatch = useDispatch();

  const validateData = (lineNumber: number, key: string, value: number) => {
    switch (key) {
      case "speed":
        if (value < 0) {
          dispatch(addErrors(`${lineNumber}_${key}`));
        } else {
          dispatch(removeError(`${lineNumber}_${key}`));
        }
        break;
      case "force":
        if (value <= 0 || value % 1 == 0) {
          dispatch(addErrors(`${lineNumber}_${key}`));
        } else {
          dispatch(removeError(`${lineNumber}_${key}`));
        }
        break;
      case "engineAmperage":
        if (value <= 0) {
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
