import React from 'react';
import AceEditor from 'react-ace';


import 'ace-builds/src-noconflict/mode-java'; 
import 'ace-builds/src-noconflict/theme-github'; 

function MyAceEditor() {
  const [code, setCode] = React.useState('');
  function onChange(newValue) {
    setCode(newValue);
  }

  const defaultValue = `public class Main {
    public static void main(String[] args) {
        // 코드를 여기에 작성하세요.
    }
}`;
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
    <>
    <AceEditor
      mode="java"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      value={defaultValue}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
    <button onClick={runCode}>Run</button>
    </>
  );
}

export default MyAceEditor;