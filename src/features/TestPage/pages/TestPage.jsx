import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../../store/useUserStore";

import Title from "../components/Title";
import FirstPageTitle from "../components/FirstPageTitle";
import List from "../components/List";
import Content from "../components/Content";
import LastPageContent from "../components/LastPageContent";

import { survey } from "../components/SurveyQuestions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TestPage = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore();

  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const currentQuestionIndex = questionNumber - 1;

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/${userId}/surveys/${questionNumber}`
        );
        if (res.data?.answer) {
          setAnswers((prev) => ({
            ...prev,
            [questionNumber]: res.data.answer,
          }));
        }
      } catch (err) {
        if (err.response?.status !== 404) console.error("답변 조회 실패:", err);
      }
    };
    fetchAnswer();
  }, [questionNumber, userId]);

  const handleAnswer = async (answer) => {
    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}/api/users/${userId}/surveys/${questionNumber}`,
        { answer }
      );
      setAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
    } catch (err) {
      console.error("답변 저장 실패:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSurvey = async () => {
    if (answers[6] == null) return;

    try {
      await axios.post(`${BASE_URL}/api/users/${userId}/surveys/submit`, {
        answer: answers[6],
      });
      navigate("/typeInfo");
    } catch (err) {
      console.error("최종 결과 제출 실패:", err.response?.data || err);
    }
  };

  const handlePrev = () => {
    if (questionNumber > 1) setQuestionNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (answers[questionNumber] != null && questionNumber < survey.length) {
      setQuestionNumber((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <Wrapper>
        {questionNumber === 1 ? (
          <FirstPageTitle questionIndex={currentQuestionIndex} />
        ) : (
          <Title questionIndex={currentQuestionIndex} />
        )}
        <List
          questionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          selectedAnswer={answers[questionNumber]}
          loading={loading}
        />
      </Wrapper>
      {questionNumber === survey.length ? (
        <LastPageContent
          onSubmit={handleSubmitSurvey}
          disabled={answers[6] == null}
        />
      ) : (
        <Content
          questionNumber={questionNumber}
          onPrev={handlePrev}
          onNext={handleNext}
          selectedAnswer={answers[questionNumber]}
        />
      )}
    </Container>
  );
};

export default TestPage;

/* ================= styled ================= */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 9rem;
  padding-bottom: 3rem;
  background-color: #eceaff;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
