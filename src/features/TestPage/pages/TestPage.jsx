import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Title from '../components/Title';
import FirstPageTitle from '../components/FirstPageTitle';
import List from '../components/List';
import Content from '../components/Content';
import LastPageContent from "../components/LastPageContent";

import { survey } from "../components/SurveyQuestions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, user } = location.state; 

  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const currentQuestionIndex = questionNumber - 1;

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${userId}/surveys/${questionNumber}`);
        if (res.data?.answer) {
          setAnswers(prev => ({ ...prev, [questionNumber]: res.data.answer }));
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
      await axios.patch(`${BASE_URL}/api/users/${userId}/surveys/${questionNumber}`, { answer });
      setAnswers(prev => ({ ...prev, [questionNumber]: answer }));
    } catch (err) {
      console.error("답변 저장 실패:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // 최종 제출 → typeInfo로 이동
  const handleSubmitSurvey = async () => {
    const question6Answer = answers[6];
    if (question6Answer == null) {
      alert("6번 질문을 선택해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/users/${userId}/surveys/submit`, { answer: question6Answer });
      const { nickname, level } = res.data;
      navigate("/typeInfo", { state: { userId, user, nickname, level } }); 
    } catch (err) {
      console.error("최종 결과 제출 실패:", err.response?.data || err);
    }
  };

  const handlePrev = () => { if (questionNumber > 1) setQuestionNumber(prev => prev - 1); };
  const handleNext = () => { if (questionNumber < survey.length) setQuestionNumber(prev => prev + 1); };

  const renderTitle = () =>
    questionNumber === 1
      ? <FirstPageTitle questionIndex={currentQuestionIndex} />
      : <Title questionIndex={currentQuestionIndex} />;

  const renderContent = () =>
    questionNumber === survey.length
      ? <LastPageContent onSubmit={handleSubmitSurvey} />
      : <Content questionNumber={questionNumber} onPrev={handlePrev} onNext={handleNext} />;

  return (
    <Container>
      <Wrapper>
        {renderTitle()}
        <List
          questionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          selectedAnswer={answers[questionNumber]}
          loading={loading}
        />
      </Wrapper>
      {renderContent()}
    </Container>
  );
};

export default TestPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;  
  width: 100%;
  padding-top: 9rem;
  padding-bottom: 3rem;
  background-color: #ECEAFF;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
