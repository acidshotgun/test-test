import { memo } from "react";
import { useDispatch } from "react-redux";
import { updateCharacteristics } from "../../redux/slices/trains";

interface ITableCeil {
  characteristicName: string;
  characteristicValue: number;
  rowIndex: number;
}

const TableCeil = memo(
  ({ characteristicName, characteristicValue, rowIndex }: ITableCeil) => {
    const dispatch = useDispatch();

    return (
      <td>
        <input
          type="text"
          value={characteristicValue}
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
  }
);

export default TableCeil;
