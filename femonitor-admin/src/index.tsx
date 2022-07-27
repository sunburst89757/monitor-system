import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./store";
import { BrowserRouter } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
// import monitor from "monitor-demo";
import App from "./App";
// monitor.init({
//   url: "http://localhost:8080/reportData"
// });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
