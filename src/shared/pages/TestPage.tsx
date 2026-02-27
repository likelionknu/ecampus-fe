import { useState } from "react";
import Button from "../components/Button";

function TestPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <Button onClick={handleClick}>확인</Button>
      <Button isLoading={isLoading}>확인ㅇㄴㅁㅇㄴㅁㅇㅁ</Button>
      <Button variant="danger" isLoading={isLoading}>
        확인
      </Button>
      <Button className="py-2.5 text-[15px]" isLoading={isLoading}>
        확인
      </Button>
    </div>
  );
}

export default TestPage;
