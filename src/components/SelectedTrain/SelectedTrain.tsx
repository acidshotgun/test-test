import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTrain } from "../../redux/slices/trains";
import { RootState } from "../../redux/store";
import TableLayout from "../TableLayout/TableLayout";
import TableCell from "../TableCell/TableCell";
import styles from "./SelectedTrain.module.scss";

const SelectedTrain = () => {
  const selectedTrain = useSelector(
    (state: RootState) => state.trains.selectedTrain
  );
  const errors = useSelector((state: RootState) => state.trains.errors);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const speed = selectedTrain!.characteristics
      .map((item) => {
        return item.speed;
      })
      .sort((a: number, b: number) => {
        return a - b;
      });

    for (const key of speed) {
      console.log(key);
    }
  };

  const onHandleCloseTable = () => {
    dispatch(clearSelectedTrain());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <TableLayout
          tableTitle="Характеристики"
          tableSubtitle={selectedTrain ? selectedTrain.name : null}
          tableColumnsName={["Ток двигателя", "Сила тяги", "Скорость"]}
          tablePlaceholder="Поезд не выбран"
          onHandleClose={onHandleCloseTable}
        >
          {selectedTrain?.characteristics &&
            selectedTrain.characteristics.map((char, i: number) => {
              return (
                <tr key={i} className={styles.item}>
                  {Object.entries(char)
                    .reverse()
                    .map((param, idx: number) => {
                      return (
                        <TableCell
                          characteristicName={param[0]}
                          characteristicValue={param[1]}
                          key={idx}
                          rowIndex={i}
                          errorInfo={errors.includes(`${i}_${param[0]}`)}
                        />
                      );
                    })}
                </tr>
              );
            })}
        </TableLayout>
      </div>
      {selectedTrain && (
        <button disabled={errors.length > 0} type="submit">
          ОТПРАВИТЬ
        </button>
      )}
    </form>
  );
};

export default SelectedTrain;
