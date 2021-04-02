import { useTypedSelector } from "../hooks/use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cells;

    const codes: string[] = [];

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = function(value) {
          const root = document.querySelector("#root");
         if(typeof value === 'object') {
           
          if(value.$$typeof && value.props) {
            _ReactDOM.render(value,root);  
          }
          else{
            root.innerHTML = JSON.stringify(value); 
          }
         }
         else {
          root.innerHTML = value;
         }
      }
    `;

    const showFundNoop = `var show = function() {}`;

    for (let id of order) {
      if (data[id].type === "code") {
        if (id === cellId) {
          codes.push(showFunc);
        } else {
          codes.push(showFundNoop);
        }

        codes.push(data[id].content);
        if (id === cellId) {
          break;
        }
      }
    }
    return codes.join("\n");
  });
};
