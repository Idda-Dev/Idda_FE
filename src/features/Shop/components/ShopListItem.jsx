import React, { useState } from 'react';
import styled from 'styled-components';
import Candy from "../assets/Candy.png";
import ShopModal from '../components/ShopModal';

const ShopListItem = ({ item, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCountClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container>
        <PhotoBox src={item.storeImageUrl} alt={item.storeName} />
        <Wrapper>
          <Title>{item.storeName}</Title>
          <Text>{item.title}</Text>
          <CandyWrapper>
            <Icon src={Candy} alt="Candy Icon" />
            <Count onClick={handleCountClick}>{item.price}개</Count>
          </CandyWrapper>
        </Wrapper>
      </Container>

      <ShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
        userId={userId} // userId 전달
      />
    </>
  );
};

export default ShopListItem;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #D1CDFF;
  padding: 1rem 0;
`;

const PhotoBox = styled.img`
  height: 5.5rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 5.5rem;
  width: 10.8rem;
`;

const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 20px;
`;

const Text = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.3px;
  line-height: 20px;
  margin-bottom:0.8rem ;
`;

const CandyWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
`;

const Icon = styled.img`
  width: 3rem;
  height: 1.6rem;
`;

const Count = styled.div`
  background-color: #D1CDFF;
  height: 1.7rem;
  width: 4rem;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 550;
  cursor: pointer;
`;
