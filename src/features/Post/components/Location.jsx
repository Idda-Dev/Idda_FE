import React, { useState } from 'react';
import styled from 'styled-components';
import { seouldistricts } from '../../../mocks/seouldistricts';

// 드롭다운에 표시할 위치 목록
const locations = seouldistricts;

const Location = ({ location, setLocation }) => {
  // 드롭다운 메뉴의 열림/닫힘 상태를 관리합니다.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLocationClick = () => {
    // 클릭할 때마다 드롭다운 상태를 토글합니다.
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLocation = (newLocation) => {
    // 선택된 지역으로 상태를 업데이트하고, 드롭다운을 닫습니다.
    setLocation(newLocation);
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper>
      {/* 현재 선택된 지역을 표시하는 버튼. 클릭하면 드롭다운을 토글합니다. */}
      <DropdownButton onClick={handleLocationClick}>
        {location}
      </DropdownButton>
      
      {/* isDropdownOpen 상태가 true일 때만 드롭다운 메뉴를 렌더링합니다. */}
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
  align-items: center;
  padding: 0 1rem;
`;

const DropdownButton = styled.div`
  display: inline-block;
  align-self: flex-start;
  background-color: #D1CDFF;
  padding: 0.3rem 1rem;
  border-radius: 36px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer; /* 클릭 가능한 요소임을 나타냅니다. */
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%; /* 버튼 바로 아래에 위치 */
  left: 1rem;
  height: 14rem;
  overflow: auto;
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0 0 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Location;