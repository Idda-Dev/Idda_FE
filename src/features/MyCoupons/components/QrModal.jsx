import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { qr as qrMockData } from "../../../mocks/qr";
import BackIcon from "../assets/BackIcon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userId = 1;

const QrModal = ({ memberCouponId, onClose }) => {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      setLoading(true);
      try {
        let fetchedQrUrl = null;
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          fetchedQrUrl = qrMockData.url;
        } else {
          const res = await axios.get(`${BASE_URL}/api/users/${userId}/my-coupons/${memberCouponId}/qr`);
          fetchedQrUrl = res.data.url;
        }
        setQrUrl(fetchedQrUrl);
      } catch (err) {
        console.error("QR 코드 API 호출 실패:", err);
        setError("QR 코드를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, [memberCouponId]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <QrImageWrapper>
          {loading ? (
            <LoadingMessage>QR 코드를 불러오는 중...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : qrUrl ? (
            <QrImage src={qrUrl} alt="QR Code" />
          ) : (
            <ErrorMessage>QR 코드를 찾을 수 없습니다.</ErrorMessage>
          )}
        </QrImageWrapper>
      </ModalContent>
      <Use>
        사용하기
      </Use>
      <CloseButton src={BackIcon} onClick={onClose} />
    </ModalOverlay>
  );
};

export default QrModal;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  height: 13rem;
  width: 13rem;
  margin-top: 6rem;
  padding: 0;
  border-radius: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const QrImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  
  /* 그라데이션 테두리 */
  background: white;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 30px;
    padding: 7px;
    background: linear-gradient(to bottom right, #2F0047, #B1AAFF);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const Use = styled.div`
  margin-top: 3rem;
  width: 13rem;
  padding: 0.75rem;
  background-color: #D1CDFF;
  border: none;
  border-radius: 36px;
  font-size: 1rem;
  font-weight: 550;
  color: black;
  text-align: center;
`;

const CloseButton = styled.img`
  margin-top: 5rem;
  height: 1.5rem;
  width: 1.5rem;
  background-color: #D1CDFF;
  border: none;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 550;
  cursor: pointer;
  color: black;
`;

const QrImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LoadingMessage = styled.p`
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
`;