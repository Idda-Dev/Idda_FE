import React, { useState } from 'react';
import styled from 'styled-components';
import { seouldistricts } from '../../../mocks/seouldistricts';
import dropdownIcon from '../assets/DownIcon.png'; 

// 드롭다운에 표시할 위치 목록
const locations = seouldistricts;

const Location = ({ location, setLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLocationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLocation = (newLocation) => {
    // 선택된 지역으로 상태를 업데이트하고, 드롭다운을 닫기
    setLocation(newLocation);
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper>
      <DropdownButton onClick={handleLocationClick}>
        <span>{location}</span>
        <img src={dropdownIcon} alt="드롭다운 아이콘" />
      </DropdownButton>

      {/* isDropdownOpen 상태가 true일 때만 드롭다운 메뉴를 렌더링 */}
      {isDropdownOpen && (
        <DropdownList>
          {locations.map((loc, index) => (
            <DropdownItem key={index} onClick={() => handleSelectLocation(loc)}>
              {loc}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1rem;
`;

const DropdownButton = styled.div`
  display: flex; 
  justify-content: space-between; /* 텍스트와 이미지를 양 끝으로 분리 */
  align-items: center; /* 세로 중앙 정렬 */
  background-color: #D1CDFF;
  padding: 0.3rem 1rem;
  border-radius: 36px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  img {
    width: 0.9rem; /* 이미지 크기 조정 */
    margin-left: 0.5rem; /* 텍스트와 이미지 사이 간격 */
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 1rem;
  height: 10rem;
  width: 5rem;
  overflow: auto;
  z-index: 10;
  background-color: #F2F2F2;
  border: none;
  border-radius: 9px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0 0 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: 550;
  color: #7F7F7F;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0; /* 항목 아래에 경계선 추가 */
  &:hover {
    background-color: #f0f0f0;
  }
  &:last-child {
    border-bottom: none; /* 마지막 항목의 경계선 제거 */
  }
`;

export default Location;