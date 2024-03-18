import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCharacteristics } from "../../redux/slices/trains";

interface ITableCeil {
  characteristicName: string;
  characteristicValue: number;
  rowIndex: number;
}

const TableCeil = ({
  characteristicName,
  characteristicValue,
  rowIndex,
}: ITableCeil) => {
  const [value, setValue] = useState(characteristicValue);
  const dispatch = useDispatch();

  useEffect(() => {}, [value]);

  useEffect(() => {
    setValue(characteristicValue);
  }, [characteristicValue]);

  return (
    <td>
      <input
        type="text"
        value={value}
        name={characteristicName}
        onChange={({ target }) =>
          dispatch(
            updateCharacteristics({
              charIndex: rowIndex,
              charName: target.name,
              value: target.value,
            })
          )
        }
      />
    </td>
  );
};

export default TableCeil;
