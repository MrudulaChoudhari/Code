import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import Result from "./components/Result";

function App() {
  //* States for code and active tab
  const [activeTab, setActiveTab] = useState("html");
  const [html_edit, setHtml_Edit] = useState("");
  const [css_edit, setCss_Edit] = useState("");
  const [js_edit, setJs_Edit] = useState("");

  //* Html onchange handler
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  //* Css onchange handler
  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  //* JavaScript onchange handler
  const onChangeJavascript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  //* Html Document
  const srcCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css_edit}</style>
      </head>
      <body>${html_edit}</body>
      <script>${js_edit}</script>
    </html>
  `;

  return (
    <div className="app-container">
      <Navbar />

      {/* Tabs for Switching */}
      <div className="tabs flex bg-gray-800 text-white">
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === "html" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("html")}
        >
          HTML
        </button>
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === "css" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("css")}
        >
          CSS
        </button>
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === "js" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("js")}
        >
          JavaScript
        </button>
      </div>

      {/* Code Editor */}
      <div className="code-editor h-1/2">
        {activeTab === "html" && (
          <CodeMirror
            value={html_edit}
            onChange={(value) => setHtml_Edit(value)}
            extensions={[html()]}
            options={{
              mode: "htmlmixed",
              theme: "material",
              lineNumbers: true,
            }}
          />
        )}
        {activeTab === "css" && (
          <CodeMirror
            value={css_edit}
            onChange={(value) => setCss_Edit(value)}
            extensions={[css()]}
            options={{
              mode: "css",
              theme: "material",
              lineNumbers: true,
            }}
          />
        )}
        {activeTab === "js" && (
          <CodeMirror
            value={js_edit}
            onChange={(value) => setJs_Edit(value)}
            extensions={[javascript()]}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
          />
        )}
      </div>

      {/* Output Panel */}
      <Result srcCode={srcCode} />
    </div>
  );
}

export default App;

    
