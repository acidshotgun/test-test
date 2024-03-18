import { useState, useEffect } from "react";

interface ITableCeil {
  name: string;
  value: number;
  rowIndex: number;
  columnIndex: number;
}

const TableCeil = ({ param }: ITableCeil) => {
  const [value, setValue] = useState(param);
  console.log(value);

  useEffect(() => {
    setValue(param);
  }, [param]);

  return (
    <td>
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(+target.value)}
      />
    </td>
  );
};

export default TableCeil;
