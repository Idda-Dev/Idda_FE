import React from 'react'
import styled from 'styled-components'
import ProfileIcon from "../assets/ProfileIcon.png"

const Profile = ({ nickname, profileImageUrl, time }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);

    return `${date.getFullYear()}/${
      String(date.getMonth() + 1).padStart(2, "0")
    }/${String(date.getDate()).padStart(2, "0")} ${
      String(date.getHours()).padStart(2, "0")
    }:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <Container>
      <Wrapper>
        <ProfileImage src={profileImageUrl} alt="프로필 이미지" />
        <NickName>{nickname}</NickName>
      </Wrapper>
      <Time>{formatTime(time)}</Time>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위쪽: Wrapper, 아래쪽: Time */
  align-items: flex-start; 
  width: 74%;
  height: 9%;
  padding: 0;
  margin: 0;
  margin: 2rem 0 0 0; /* 위쪽만 10px */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.6rem;
  gap: 10%;
  height: 70%; // wrapper랑 time 7:3 비율
`;

const ProfileImage = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;  /* 항상 정사각형 유지 */
  object-fit: cover;     /* 이미지 중앙 기준으로 잘림 */
  border-radius: 50%;    /* 원형 */
`;


const NickName = styled.div`
  height: 70%;
  display: inline-flex;          /* 텍스트 길이에 맞춰 폭 자동 조절 */
  align-items: center;           
  justify-content: center;       
  padding: 0.5rem 1rem;          
  background-color: #D1CDFF;
  border-radius: 16px;
  font-size: 0.7rem;
  font-weight: 550;
  margin: 0;
  width: fit-content;
  max-width: 300px;              /* 최대 폭 제한 */
  box-sizing: border-box;        /* padding 포함해서 최대 폭 계산 */
  white-space: nowrap; 
`;

const Time = styled.p`
  width: 100%;
  height: 30%;
  letter-spacing: 0.3px;
  font-size: 0.55rem;
  color: #7F7F7F;
  text-align: right;
  margin: 0;
  padding: 0 0.6rem;
  flex-shrink: 0; /* 줄어들지 않도록 */
`;


export default Profile;