import { useState } from "react";
import CalendarIconImg from "@admin/domains/session/assets/calendar.png";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

const NOTICE_MESSAGE =
  "과제 등록 시 세션에 추가된 모든 사용자가 과제 대상으로 포함돼요";
const TITLE_MAX_LENGTH = 80;
const DESCRIPTION_MAX_LENGTH = 700;
const FIELD_INPUT_CLASS =
  "h-12.5 px-8 py-0 text-sm leading-6 placeholder:text-sm";

interface AssignmentUploadFormState {
  dueDate: string;
  title: string;
  description: string;
}

const INITIAL_FORM_STATE: AssignmentUploadFormState = {
  dueDate: "",
  title: "",
  description: "",
};

interface AssignmentUploadFieldProps {
  label: string;
  remainingCount?: number;
  children: React.ReactNode;
}

function AssignmentUploadField({
  label,
  remainingCount,
  children,
}: AssignmentUploadFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-medium text-ec-black">{label}</span>
        {typeof remainingCount === "number" && (
          <span className="text-caption text-ec-sub">
            {remainingCount}자 남음
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function AssignmentUploadForm() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  return (
    <div className="flex w-full flex-col items-end gap-5">
      <div className="border-ec-blue rounded-ec-10 self-stretch border bg-ec-white px-7 py-4.5 text-body-2 text-ec-blue">
        {NOTICE_MESSAGE}
      </div>

      <AssignmentUploadField label="과제 종료일 설정">
        <div className="relative">
          <Input
            placeholder="과제 종료일 선택"
            value={form.dueDate}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, dueDate: e.target.value }));
            }}
            className={`${FIELD_INPUT_CLASS} pr-12`}
          />
          <div className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2">
            <img src={CalendarIconImg} alt="" className="h-3 w-3" />
          </div>
        </div>
      </AssignmentUploadField>

      <AssignmentUploadField
        label="과제 명"
        remainingCount={TITLE_MAX_LENGTH - form.title.length}
      >
        <Input
          maxLength={TITLE_MAX_LENGTH}
          placeholder="과제 명을 입력하세요"
          value={form.title}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, title: e.target.value }));
          }}
          className={FIELD_INPUT_CLASS}
        />
      </AssignmentUploadField>

      <AssignmentUploadField
        label="과제 설명"
        remainingCount={DESCRIPTION_MAX_LENGTH - form.description.length}
      >
        <textarea
          maxLength={DESCRIPTION_MAX_LENGTH}
          placeholder="과제 설명을 입력하세요"
          value={form.description}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, description: e.target.value }));
          }}
          className="bg-ec-box rounded-ec-10 h-55.5 w-full resize-none px-8 py-3 text-sm leading-6 text-ec-black placeholder:text-sm placeholder:text-ec-sub outline-none"
        />
      </AssignmentUploadField>

      <div className="self-end">
        <Button size="large">등록</Button>
      </div>
    </div>
  );
}

export default AssignmentUploadForm;
