import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/useUserStore";

import LoginBg from "../assets/LoginBg.png";
import StartButtonImg from "../assets/StartButton.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setUser = useUserStore((state) => state.setUser);

  const handleStart = async () => {
    if (!nickname.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${BASE_URL}/api/users/register`, {
        nickname,
      });
      const userData = res.data;

      setUser(userData); // ✅ zustand에 저장

      if (userData.newMember) {
        navigate("/test");
      } else {
        navigate("/main");
      }
    } catch (err) {
      console.error("API 호출 실패:", err);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Input
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <StartButton
          onClick={handleStart}
          disabled={!nickname.trim() || loading}
        >
          <img src={StartButtonImg} alt="start-button" />
        </StartButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Content>
    </Container>
  );
};

export default LoginPage;

/* ================= styled ================= */
const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: url(${LoginBg}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 80%;
  max-width: 300px;
`;

const Input = styled.input`
  width: 50%;
  padding: 0.6rem 0.8rem;
  font-size: 0.7rem;
  text-align: center;
  border: none;
  border-radius: 36px;
  outline: none;
  background-color: #b1aaff;

  &::placeholder {
    color: white;
  }
`;

const StartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  img {
    width: 55%;
    height: auto;
    transition: transform 0.1s ease-in-out;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }

  &:active img {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.95)")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.75rem;
  margin-top: -1rem;
`;
