import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PostList from "../features/Post/components/PostList";
import Location from "../features/Post/components/Location";
import TabBar from "../components/TabBar";
import PurpleCommunityIcon from "../assets/PurpleCommunityIcon.png";

import { useLocation } from "react-router-dom";
import axios from "axios";

const CommunityPage = () => {
  const locationState = useLocation();
  const { userId } = locationState.state || {};

  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState("동작구"); // ✅ 기본값 "동작구"

  // 유저 ID 전달 확인
  useEffect(() => {
    console.log("✅ 전달된 userId:", userId);
  }, [userId]);

  // 유저 정보 조회 API 호출
  useEffect(() => {
    if (!userId) return; // userId 없으면 API 안 부름

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUserData(res.data);

        // 응답에 location 있으면 업데이트
        if (res.data.location) {
          setLocation(res.data.location);
        }
      } catch (error) {
        console.error("❌ 유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <Container>
      <Header title="다같이 한걸음" backPath="/main" userId={userId} />
      <Wrapper>
        {userData ? (
          <>
            <Location location={location} setLocation={setLocation} />
            <PostListWrapper>
              <PostList location={location} userId={userId}/>
            </PostListWrapper>
          </>
        ) : (
          <>
            {/* 로딩 중에도 기본값으로 표시 */}
            <Location location={location} setLocation={setLocation} />
            <p>유저 정보를 불러오는 중...</p>
          </>
        )}
      </Wrapper>
      <TabBar icons={{ community: PurpleCommunityIcon }} userId={userId} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #f8faff;
  padding-top: 2rem;
`;

const Wrapper = styled.div`
  width: calc(74% + 2rem);
  height: calc(100% - 2.5rem);
  padding-top: 52px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default CommunityPage;
