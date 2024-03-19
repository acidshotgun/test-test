import { ReactNode } from "react";
import styles from "./TableLayout.module.scss";

interface ITableLayout {
  children: ReactNode;
  tableTitle: string;
  tableSubtitle?: string | null;
  tableColumnsName: string[];
  tablePlaceholder?: string;
  onHandleClose?: () => void;
}

const TableLayout = ({
  children,
  tableTitle,
  tableSubtitle,
  tableColumnsName,
  tablePlaceholder,
  onHandleClose,
}: ITableLayout) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h1>{tableTitle}</h1>
          <h2 className={styles.title}>
            {tableSubtitle ? tableSubtitle : tablePlaceholder}
          </h2>
        </div>
        {onHandleClose && (
          <button
            className={styles.closing}
            onClick={(e) => {
              e.preventDefault();
              onHandleClose();
            }}
          >
            Закрыть
          </button>
        )}
      </div>

      <table className={styles.table}>
        {children ? (
          <thead>
            <tr>
              {tableColumnsName.map((item, i) => {
                return <th key={i}>{item}</th>;
              })}
            </tr>
          </thead>
        ) : null}

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableLayout;
