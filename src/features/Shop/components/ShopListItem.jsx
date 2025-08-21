import React, { useState } from 'react';
import styled from 'styled-components';
import Photo from "../assets/Photo.png";
import Candy from "../assets/Candy.png";
import ShopModal from '../components/ShopModal';

const ShopListItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCountClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container>
        <PhotoBox src={Photo} />
        <Wrapper>
          <Title>{item.storeName}</Title>
          <Text>{item.title}</Text>
          <CandyWrapper>
            <Icon src={Candy} />
            <Count onClick={handleCountClick}>{item.price}개</Count>
          </CandyWrapper>
        </Wrapper>
      </Container>

      <ShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
      />
    </>
  );
};

export default ShopListItem;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
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

const Title = styled.p`
  margin: 0;
  text-align: start;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  line-height: 20px;
  font-weight: 550;
`;

const Text = styled.p`
  margin: 0;
  text-align: start;
  font-size: 0.7rem;
  line-height: 20px;
`;

const CandyWrapper = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.8rem;
  margin-bottom: 0;
  gap: 0.5rem;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Count = styled.p`
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