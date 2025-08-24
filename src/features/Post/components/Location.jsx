import React, { useState } from 'react';
import styled from 'styled-components';
import { seouldistricts } from '../../../mocks/seouldistricts';
import dropdownIcon from '../assets/DownIcon.png'; 

const locations = seouldistricts;

const Location = ({ location, setLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLocationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLocation = (newLocation) => {
    setLocation(newLocation);
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper>
      <DropdownButton $isOpen={isDropdownOpen} onClick={handleLocationClick}>
        <span>{location}</span>
        <img src={dropdownIcon} alt="드롭다운 아이콘" />
      </DropdownButton>

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

export default Location;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: max-content;
`;

const DropdownButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #D1CDFF;
  padding: 0.3rem 0.7rem;
  border-radius: ${({ $isOpen }) => ($isOpen ? '16px 16px 0 0' : '16px')};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  img {
    width: 0.9rem;
    margin-left: 0.4rem;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 11rem;
  overflow: auto;
  z-index: 10;
  background-color: #ECEAFF;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 550;
  text-align: center;
  color: #2F0047;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;
