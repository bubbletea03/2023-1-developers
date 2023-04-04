import { registerProcessState } from "atoms";
import { InputLabel, SubmitInput, Title } from "components";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { postEmailCheck } from "api";
import { useNavigate } from "react-router-dom";
import { paths } from "consts";

export default function EmailCheck() {
  const navigate = useNavigate();

  const [authCode, setAuthCode] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [authCodeWarning, setAuthCodeWarning] = useState("");
  const [registerProcess, setRegisterProcess] = useRecoilState(registerProcessState);

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(e.target.value)) {
      setEmailWarning("※이메일 형식이 일치하지 않습니다!");
      return;
    }

    setRegisterProcess((prev) => ({ ...prev, email: e.target.value }));
    setEmailWarning("");
  };

  const handleAuthCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== authCode) {
      setAuthCodeWarning("※인증 코드가 일치하지 않습니다!");
    }
  };

  const sendEmailAuthCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postEmailCheck(registerProcess.email);
    setAuthCode(response.data.data);
  };

  const verifyAuthCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(paths.register.ID_PW_REGISTER);
  };

  return (
    <>
      <Title>이메일을 입력하고, 받은 번호로 인증하세요.</Title>

      <form onSubmit={sendEmailAuthCode}>
        <InputLabel placeholder="이메일" onChange={handleEmailInput} marginTop={60} />

        <SubmitInput type="submit" value="인증 코드 보내기" warning={emailWarning} />
      </form>

      {authCode && (
        <form onSubmit={verifyAuthCode}>
          <InputLabel placeholder="인증 코드" onChange={handleAuthCodeInput} marginTop={100} />
          <SubmitInput type="submit" value="확인" warning={authCodeWarning} />
        </form>
      )}
    </>
  );
}
