import React from 'react'
import styled from 'styled-components';
import ProfileImg from "../assets/ProfileImg.png";
import TimeIcon from "../assets/TimeIcon.png";

const Profile = ({user}) => {
  const createdAt = new Date(user.createdAt);
  const now = new Date();
  const diffInMs = now - createdAt;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const togetherDays = diffInDays;

  return (
    <Container>
      <Wrapper1>
        <Icon1Wrapper>
          <Icon1 src={user.profileImageUrl}/>
        </Icon1Wrapper>
        <Nickname>{user.nickname}</Nickname>
      </Wrapper1>

      <Wrapper2>
        <Icon2 src={TimeIcon}/>
        <Time>
          우리가 함께한 시간 <Days>{togetherDays}일</Days>
        </Time>
      </Wrapper2>
    </Container>
  );
};


export default Profile;

const Container=styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    height:5.6rem;
    width: 16.2rem;
    border-radius: 12px;
    z-index: 1;
    padding: 0.95rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Wrapper1 =styled.span`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;
`

const Icon1Wrapper = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%; 
  padding: 1.2px; 
  background: linear-gradient(135deg, #2F0047, #D1CDFF); /* 왼쪽위 -> 오른쪽아래 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon1 = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
`;


const Nickname = styled.div`
    background-color: #ECEAFF;
    color: #2F0047;
    margin: 0;
    height: 1.5rem;
    padding: 0 0.8rem; 
    border-radius: 36px;
    font-size: 0.9rem;
    font-weight: 550;

    display: inline-block;
    max-width: 70%; /* 부모 Container 안에서 최대 폭 */
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
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.3rem;
`

const Icon2=styled.img`
    width: 1.2rem;
    height: auto;
`

const Time=styled.p`
    background-color: transparent;
    color: #D9D9D9;
    margin: 0;
    font-size: 0.8rem;
    font-weight: 550;
`

const Days = styled.span`
  color: white;
`;