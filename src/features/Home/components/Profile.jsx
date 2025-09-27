import React, { useState } from 'react';
import styled from 'styled-components';
import InfoButton from "../assets/InfoButton.png";
import DefaultProfileImg from "../assets/DefaultProfileImg.png";
import InfoModal from "./InfoModal"; // 모달 import

const Profile = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createdAt = new Date(user.createdAt);
  const now = new Date();
  const diffInMs = now - createdAt;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const togetherDays = diffInDays;

  const levelMap = {
    1: "한뭉치",
    2: "두뭉치",
    3: "세뭉치",
    4: "네뭉치",
    5: "솜뭉치"
  };

  return (
    <>
      <Container>
        <Wrapper1>
          <Icon1Wrapper>
            <Icon1 src={user.profileImageUrl || DefaultProfileImg}/>
          </Icon1Wrapper>
          <Nickname>{user.nickname}</Nickname>
        </Wrapper1>

        <Wrapper2>
          <Time>우리가 함께한 시간 </Time>
          <Days>{togetherDays}일</Days>
          <Wrapper3>
            <Text>집콕력</Text>
            <Icon2 
              src={InfoButton} 
              onClick={() => setIsModalOpen(true)} 
            />
          </Wrapper3>
          <Level>{levelMap[user.level] || "한뭉치"}</Level>
        </Wrapper2>
      </Container>

      {isModalOpen && <InfoModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Profile;



const Container=styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    height:8rem;
    width: 16.2rem;
    border-radius: 12px 12px 0 0;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Wrapper1 =styled.span`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid black;
    padding: 0.6rem 1rem;
`

const Icon1Wrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon1 = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: cover;   /* 비율 유지 + 영역 채우기 */
  object-position: center -30%; /* 🔽 중앙보다 조금 더 아래쪽을 기준으로 */
`;


const Nickname = styled.div`
    background-color: #ECEAFF;
    color: #2F0047;
    margin: 0;
    height: 1.5rem;
    padding: 0.1rem 0.8rem; 
    border-radius: 36px;
    font-size: 0.8rem;
    font-weight: 550;
    min-width: 4rem;

    display: inline-block;
    max-width: 60%; /* 부모 Container 안에서 최대 폭 */
    white-space: nowrap;
    overflow-x: auto;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
`;


const Wrapper2 =styled.span`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    
`

const Time=styled.p`
    background-color: transparent;
    color: #D9D9D9;
    margin: 0;
    font-size: 0.8rem;
    font-weight: 550;
    padding-right: 1rem;
    height: 25%;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-right-radius: 12px;
`

const Days = styled.span`
  color: white;
  font-size: 0.8rem;
  padding-right: 1rem;
  height: 25%;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const Wrapper3=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
  height: 25%;
  width: 100%;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.2);
`
const Icon2 = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.85);
  }
`;



const Text=styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 550;
`

const Level=styled.p`
  margin: 0;
  font-size: 0.8rem;
  padding-right: 1rem;
  height: 25%;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`