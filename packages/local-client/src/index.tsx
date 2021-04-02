import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./state";
import ReactDom from "react-dom";

import CellList from "./components/cell-list";
// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
