import TrainList from "./components/TrainsList/TrainsList";
import SelectedTrain from "./components/SelectedTrain/SelectedTrain";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <TrainList />
      <SelectedTrain />
    </div>
  );
}

export default App;
