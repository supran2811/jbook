import React, { useEffect, useRef } from "react";

import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();
  const html = `
  <html>
    <head></head>
    <body>
     <div id="root"></div>
     <style> html { background-color: white;} </style>
     <script>
     function handleError(error) {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color:red;"> <h4> Runtime error </h4>' + error + '</div>';
      console.log(error);
     }

     window.addEventListener('error',event => {
       event.preventDefault();
      handleError(event.error);
     });

      window.addEventListener('message', event => {
        try {
            eval(event.data);
        } catch(error) {
          handleError(error);
        }
      },false)
     </script>
    </body>
  </html>
`;

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      <div className="preview-error">{err}</div>
    </div>
  );
};

export default Preview;
