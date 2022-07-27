import "./App.scss";
import { Loading } from "./components/Loading";
import { MyRoutes } from "./router";
import { useAppSelector } from "./store/types";

function App() {
  const isLoading = useAppSelector((state) => state.user.loading);
  return (
    <Loading tip={"Loading"} loading={isLoading} size={"large"}>
      <MyRoutes></MyRoutes>
    </Loading>
  );
}

export default App;
