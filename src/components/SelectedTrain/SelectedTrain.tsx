import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTrain } from "../../redux/slices/trains";
import TableLayout from "../TableLayout/TableLayout";
import styles from "./SelectedTrain.module.scss";
import TableCeil from "../TableCeil/TableCeil";

// TODO доделать по валидации инпутов
const SelectedTrain = () => {
  const selectedTrain = useSelector((state) => state.trains.selectedTrain);
  const isValidationError = useSelector(
    (state) => state.trains.validationError
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const speed = selectedTrain.characteristics
      .map((item) => {
        return item.speed;
      })
      .sort((a, b) => {
        return a - b;
      });

    for (let key of speed) {
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
            selectedTrain.characteristics.map((char, i) => {
              return (
                <tr key={i} className={styles.item}>
                  {Object.entries(char)
                    .reverse()
                    .map((param, idx) => {
                      return (
                        <TableCeil
                          characteristicName={param[0]}
                          characteristicValue={param[1]}
                          key={idx}
                          rowIndex={i}
                        />
                      );
                    })}
                </tr>
              );
            })}
        </TableLayout>
      </div>
      {selectedTrain && (
        <button disabled={isValidationError} type="submit">
          ОТПРАВИТЬ
        </button>
      )}
    </form>
  );
};

export default SelectedTrain;
