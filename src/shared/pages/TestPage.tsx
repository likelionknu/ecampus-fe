import { useState } from "react";
import Button from "../components/Button";
import SerachBar from "../components/SerachBar";
import TabBar from "../components/TabBar";
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

  const testTabItems = [
    { label: "자료", path: "/test" },
    { label: "과제", path: "/user/session" },
    { label: "사용자 및 그룹", path: "/user/dashboard" },
    { label: "질문 및 답변", path: "/admin/sessions" },
  ];

  return (
    <div className="flex-row- flex gap-2">
      <TabBar items={testTabItems} />
      <div className="w-107.5">
        <SerachBar value={value} onChange={handleChange} />
      </div>
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
      <div className="w-100">
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
    </div>
  );
}

export default TestPage;
