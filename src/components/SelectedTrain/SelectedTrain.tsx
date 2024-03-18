import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTrain } from "../../redux/slices/trains";
import TableLayout from "../TableLayout/TableLayout";
import TableRow from "../TableRow/TableRow";
import styles from "./SelectedTrain.module.scss";

// TODO доделать по валидации инпутов
const SelectedTrain = () => {
  const selectedTrain = useSelector((state) => state.trains.selectedTrain);
  const dispatch = useDispatch();

  console.log("SELECTED TRAIN RERENDER");

  const handleSubmit = (e) => {
    e.preventDefault();
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
              return <TableRow trainCharacteristic={char} key={i} />;
            })}
        </TableLayout>
      </div>
      {selectedTrain && <button type="submit">ОТПРАВИТЬ</button>}
    </form>
  );
};

// const SelectedTrain = () => {
//   const selectedTrain = useSelector((state) => state.trains.selectedTrain);
//   const [trainCharacteristics, setTrainCharacteristics] = useState<[] | null>(
//     []
//   );
//   const dispatch = useDispatch();

//   console.log(trainCharacteristics);

//   useEffect(() => {
//     if (selectedTrain && selectedTrain.characteristics) {
//       setTrainCharacteristics(selectedTrain.characteristics);
//     }
//   }, [selectedTrain]);

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedCharacteristics = [...trainCharacteristics];
//     updatedCharacteristics[index] = {
//       ...updatedCharacteristics[index],
//       [name]: +value,
//     };
//     setTrainCharacteristics(updatedCharacteristics);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(trainCharacteristics);
//   };

//   const onHandleCloseTable = () => {
//     dispatch(clearSelectedTrain());
//     setTrainCharacteristics(null);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className={styles.wrapper}>
//         <TableLayout
//           tableTitle="Характеристики"
//           tableSubtitle={selectedTrain ? selectedTrain.name : null}
//           tableColumnsName={["Ток двигателя", "Сила тяги", "Скорость"]}
//           tablePlaceholder="Поезд не выбран"
//           onHandleClose={onHandleCloseTable}
//         >
//           {selectedTrain?.characteristics &&
//             trainCharacteristics?.map((char, i) => {
//               return (
//                 <tr className={styles.item} key={i}>
//                   <td>
//                     <input
//                       type="text"
//                       name="engineAmperage"
//                       value={char.engineAmperage}
//                       onChange={(event) => handleInputChange(i, event)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="force"
//                       value={char.force}
//                       onChange={(event) => handleInputChange(i, event)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="speed"
//                       value={char.speed}
//                       onChange={(event) => handleInputChange(i, event)}
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//         </TableLayout>
//       </div>
//       {selectedTrain && <button type="submit">ОТПРАВИТЬ</button>}
//     </form>
//   );
// };

export default SelectedTrain;
