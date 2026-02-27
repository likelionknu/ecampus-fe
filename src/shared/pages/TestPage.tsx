import { useState } from "react";
import Button from "../components/Button";
import SerachBar from "../components/SerachBar";
// import Modal from "../components/Modal";

function TestPage() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => (prev === e.target.value ? prev : e.target.value));
  };

  return (
    <div>
      <SerachBar value={value} onChange={handleChange} />
      {/* <Modal>
        <Modal.Header>삭제 버튼 있는 모달</Modal.Header>
        <Modal.Description>
          삭제 버튼이 있는 Modal이고 여기에는 Modal에 대한 설명이 들어가요
        </Modal.Description>
        <Modal.ButtonLayout>
          <Button variant="danger" size="modal">
            삭제
          </Button>
          <Modal.Cancle />
        </Modal.ButtonLayout>
      </Modal> */}
      <Button size="primary" onClick={handleClick}>
        확인
      </Button>
      <Button size="primary" isLoading={isLoading}>
        확인ㅇㄴㅁㅇㄴㅁㅇㅁ
      </Button>
      <Button size="primary" variant="danger" isLoading={isLoading}>
        확인
      </Button>
      <Button size="large" isLoading={isLoading}>
        확인
      </Button>
    </div>
  );
}

export default TestPage;
