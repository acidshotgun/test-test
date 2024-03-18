import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTrain, submitValues } from "../../redux/slices/trains";
import TableLayout from "../TableLayout/TableLayout";
import TableRow from "../TableRow/TableRow";
import styles from "./SelectedTrain.module.scss";

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
                <TableRow trainCharacteristic={char} key={i} rowIndex={i} />
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
