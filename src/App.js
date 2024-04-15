import CodeEditor from './components/CodeEditor';
import logo from './logo.svg';
import styled from 'styled-components';

const EditorBox = styled.div`
  min-height: 100vh;
  background-color: #0f0a19;
  color: gray;
  padding: 6px 8px;
`

function App() {
  return (
    //재사용성 유의
    //페이지 구조를 생각해보자
    //1. 매트릭스 페이지(1-1. 로그인 / 1-2. 회원가입)
    //1-1.로그인 페이지(1. 랜딩 페이지 / 2. IDE 페이지)
    //1-2.회원가입 (취소 -> 1. 랜딩 페이지 / 확인 -> 검증 후 랜딩 페이지)
    //2. IDE 페이지 ( 2-1. 개인 정보 수정 페이지 / 2-2. 채팅 파)

    <EditorBox>
      <CodeEditor/>
    </EditorBox>
  );
}

export default App;
