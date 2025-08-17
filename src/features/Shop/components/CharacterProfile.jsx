import React from 'react'
import styled from 'styled-components';
import CharacterIcon from "../assets/Photo.png";
import Candy from "../assets/Candy.png";


const CharacterProfile = () => {
  return (
    <Container>
        <Profile src={CharacterIcon}/>
        <Content>
          <Wrapper>
            <Icon src={Candy}/>
            <MyCandy>보유 솜사탕 40개</MyCandy>
          </Wrapper>
          <Button>내 쿠폰함 가기</Button>
        </Content>
    </Container>
  );
}

export default CharacterProfile;

const Container = styled.div`
    height: 21%;
    width: 73%;
    background-color: #2F0047;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 2rem;
    padding: 1rem 1.7rem;
`

const Profile=styled.img`
  height: 5.5rem;
  width: 5.5rem;
  border-radius: 50%;
`
const Content=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 5.5rem;
`

const Wrapper=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  align-items: center; 
  gap:0.4rem;
`
const Icon=styled.img`
  height: 1.7rem;
  width: auto;
`
const MyCandy=styled.p`
  font-size: 0.7rem;
  font-weight: 550;
  color: white;
`

const Button = styled.button`
  background-color: white; /* 버튼 배경색 */
  color: black;
  border-radius: 16px;
  font-size: 0.6rem;
  font-weight: 550;
  cursor: pointer;
  width: 75%;                
  height: 1.5rem;         
  text-align: center;

  display: flex;             /* ✅ 글자 중앙 정렬 */
  justify-content: center;   /* 수평 중앙 */
  align-items: center;       /* 수직 중앙 */

  padding: 0.7rem 0;                /* 불필요한 padding 제거 */

  border: none;              /* 테두리 제거 */
  outline: none;             /* 클릭/포커스 아웃라인 제거 */

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

