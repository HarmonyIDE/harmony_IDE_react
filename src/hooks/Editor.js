import React, { useState } from 'react';
import AceEditor from "react-ace";
import '../styles/Editor.css';

import "ace-builds/src-noconflict/mode-java";
// 모든 테마 임포트
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';

function App() {
  const [theme, setTheme] = useState('');
  const [code, setCode] = React.useState('');

  async function runCode() {
    try {
      const response = await fetch('서버의 실행 API 주소', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('코드 실행 중 에러 발생:', error);
    }
  }
return (
  <div className="App">
    <AceEditor
      mode="java"
      theme={theme}
      width="50vw"
      height="70vh"
      fontSize={16}
      placeholder="코드를 작성해 주세요."
      className="editor" 
      onChange={(newValue) => setCode(newValue)}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
    <div className="controls">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="theme-selector"
      >
        <option value="" disabled selected>테마</option>
        <option value="monokai">Monokai</option>
        <option value="github">GitHub</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="kuroir">Kuroir</option>
        <option value="twilight">Twilight</option>
        <option value="xcode">Xcode</option>
        <option value="textmate">TextMate</option>
        <option value="solarized_dark">Solarized Dark</option>
        <option value="solarized_light">Solarized Light</option>
        <option value="terminal">Terminal</option>
      </select>
      <button onClick={runCode} className="run-button">Run</button>
    </div>
  </div>
);
}

export default App;