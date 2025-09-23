import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Content1 from './Content1';
import Content2 from './Content2';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShopModal = ({ isOpen, onClose, item, userId }) => {
  const [clicked, setClicked] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [userCandy, setUserCandy] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  // 유저 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL 미설정 → 목데이터 사용");
          setUserCandy(1000); // 목데이터 캔디
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setUserCandy(res.data.candy);
      } catch (err) {
        console.error("유저 정보 API 호출 실패:", err);
        setUserCandy(0);
      } finally {
        setLoadingUser(false);
      }
    };

    if (isOpen) fetchUserInfo();
  }, [userId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setClicked(false);
      setPurchaseSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  if (loadingUser) return <Overlay>로딩중...</Overlay>;

  const handleClickConfirm = async () => {
    if (userCandy < item.price) {
      console.log("캔디 부족");
      setPurchaseSuccess(false);
      setClicked(true);
      return;
    }

    if (!BASE_URL) {
      console.warn("⚠️ BASE_URL 미설정 → 목데이터 시뮬레이션");
      setPurchaseSuccess(true);
      setClicked(true);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/${userId}/coupons/${item.couponId}`
      );
      setPurchaseSuccess(response.status === 201);
    } catch (err) {
      console.error("API 호출 실패:", err);
      setPurchaseSuccess(false);
    } finally {
      setClicked(true);
    }
  };

  const handleClickComplete = () => {
    onClose();
    if (purchaseSuccess) {
      navigate("/coupon", { state: { userId } });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {clicked ? <Content2 isSuccess={purchaseSuccess} /> : <Content1 item={item} />}
        {!clicked ? (
          <Button onClick={handleClickConfirm}>구매하기</Button>
        ) : (
          <Button onClick={handleClickComplete}>
            {purchaseSuccess ? "내 쿠폰함 가기" : "되돌아가기"}
          </Button>
        )}
      </ModalBox>
    </Overlay>
  );
};

export default ShopModal;

// Styled-components
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 16rem;
  height: 13rem;
  background-color: #D1CDFF;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #B1AAFF;
  color: black;
  border: none;
  border-radius: 16px;
  font-size: 0.8rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus { outline: none; }
`;
