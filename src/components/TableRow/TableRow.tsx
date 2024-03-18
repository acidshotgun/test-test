import TableCeil from "../TableCeil/TableCeil";

import styles from "./TableRow.module.scss";

interface ITableRow {
  trainCharacteristic: any;
  rowIndex: number;
}

const TableRow = ({ trainCharacteristic, rowIndex }: ITableRow) => {
  const renderParams = Object.entries(trainCharacteristic);

  return (
    <tr className={styles.item}>
      {renderParams.map((param, i) => {
        return (
          <TableCeil
            characteristicName={param[0]}
            characteristicValue={param[1]}
            key={i}
            rowIndex={rowIndex}
          />
        );
      })}
    </tr>
  );
};

export default TableRow;
