import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainsData, selectTrainByName } from "../../redux/slices/trains";

import TableLayout from "../TableLayout/TableLayout";

import styles from "./TrainList.module.scss";

const TrainList = () => {
  const dispatch = useDispatch();
  const trainsData = useSelector((state) => state.trains.trains);

  console.log("render");

  useEffect(() => {
    dispatch(fetchTrainsData());
  }, []);

  const onHandleClick = (name) => {
    dispatch(selectTrainByName(name));
  };

  return (
    <div className={styles.wrapper}>
      <TableLayout
        tableTitle="Поезда"
        tableColumnsName={["Название", "Описание"]}
      >
        {trainsData &&
          trainsData.map((train, index) => {
            return (
              <tr
                className={styles.item}
                onClick={() => {
                  onHandleClick(train.name);
                }}
                key={index}
              >
                <td>{train.name}</td>
                <td>{train.description}</td>
              </tr>
            );
          })}
      </TableLayout>
    </div>
  );
};

export default TrainList;
