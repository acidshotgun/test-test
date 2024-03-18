import TableCeil from "../TableCeil/TableCeil";

import styles from "./TableRow.module.scss";

interface ITableRow {
  rowIndex: number;
  trainCharacteristic: any;
}

const TableRow = ({ trainCharacteristic, rowIndex }: ITableRow) => {
  const renderParams = Object.entries(trainCharacteristic);

  return (
    <tr className={styles.item}>
      {/* <TableCeil param={engineAmperage} />
      <TableCeil param={force} />
      <TableCeil param={speed} /> */}
      {renderParams.map((param, i) => {
        return <TableCeil name={param[0]} param={param[1]} key={i} />;
      })}
    </tr>
  );
};

export default TableRow;
