import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCharacteristics } from "../../redux/slices/trains";
import useCustomValidation from "../../hooks/useValidation";
import { ICharacteristict } from "../../redux/slices/trains";

interface ITableCell {
  characteristicName: string;
  characteristicValue: number;
  rowIndex: number;
  errorInfo: boolean;
  updateTrainChar: any;
}

const TableCell = memo(
  ({
    characteristicName,
    characteristicValue,
    rowIndex,
    errorInfo,
    updateTrainChar,
  }: ITableCell) => {
    const validateData = useCustomValidation();
    const dispatch = useDispatch();

    useEffect(() => {
      validateData(rowIndex, characteristicName, characteristicValue);
    }, [characteristicValue]);

    return (
      <td>
        <input
          style={{ border: errorInfo ? "2px solid red" : "", outline: "none" }}
          type="number"
          value={characteristicValue}
          name={characteristicName}
          onChange={({ target }) => {
            updateTrainChar(rowIndex, target.name, +target.value);
          }}
          // onChange={({ target }) =>
          //   dispatch(
          //     updateCharacteristics({
          //       charIndex: rowIndex,
          //       charName: target.name as keyof ICharacteristict,
          //       value: +target.value,
          //     })
          //   )
          // }
        />
      </td>
    );
  }
);

export default TableCell;
