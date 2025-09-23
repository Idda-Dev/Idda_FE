import React, { useState } from 'react';
import styled from 'styled-components';
import QrModal from './QrModal';

const Coupon = ({ item, activeTab, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUsedOrExpired = activeTab === 2;

  const handleButtonClick = () => {
    if (!isUsedOrExpired) {
      setIsModalOpen(true);
    } else {
      console.log("사용불가");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <PhotoBox src={item.storeImageUrl} />
        <Wrapper>
          <Title>{item.storeName}</Title>
          <Text>{item.title}</Text>
          <MiniWrapper>
            <EndTime>~ {new Date(item.expiresAt).toLocaleDateString()}</EndTime>
            <Button
              onClick={handleButtonClick}
              disabled={isUsedOrExpired}
              $isUsedOrExpired={isUsedOrExpired}
            >
              {isUsedOrExpired ? "사용불가" : "사용하기"}
            </Button>
          </MiniWrapper>
        </Wrapper>
      </Container>
      {isModalOpen && (
        <QrModal
          memberCouponId={item.memberCouponId}
          onClose={handleCloseModal}
          userId={userId}  
        />
      )}
    </>
  );
};

export default Coupon;

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #D1CDFF;
`;

const PhotoBox = styled.img`
  height: 5.5rem;
  margin: 1rem 0;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 5.5rem;
  width: 10.8rem;
  margin: 1rem 0;
`;

const Title = styled.div`
  text-align: start;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  line-height: 20px;
  font-weight: 550;
`;

const Text = styled.div`
  text-align: start;
  font-size: 0.7rem;
  line-height: 20px;
`;

const MiniWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.8rem;
  gap: 0.5rem;
`;

const EndTime = styled.div`
  font-size: 0.7rem;
  color: #444444;
`;

const Button = styled.button`
  background-color: ${({ $isUsedOrExpired }) =>
    $isUsedOrExpired ? "#EEEEEE" : "#D1CDFF"};
  height: 1.7rem;
  width: 4.7rem;
  border-radius: 16px;
  border: none;
  color: ${({ $isUsedOrExpired }) => ($isUsedOrExpired ? "#BDBDBD" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 550;
  cursor: ${({ $isUsedOrExpired }) => ($isUsedOrExpired ? "not-allowed" : "pointer")};

  &:focus {
    outline: none;
  }
`;
