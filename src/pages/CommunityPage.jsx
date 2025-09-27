import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useUserStore from "../store/useUserStore";

import Header from "../components/Header";
import PostList from "../features/Post/components/PostList";
import Location from "../features/Post/components/Location";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommunityPage = () => {
  const userId = useUserStore((s) => s.userId);
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState("동작구");

  useEffect(() => {
    if (!userId) return;
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setUserData(res.data);
        if (res.data.location) setLocation(res.data.location);
      } catch (error) {
        console.error("❌ 유저 정보 불러오기 실패:", error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  return (
    <Container>
      <Header title="다같이 한걸음" backPath={-1} userId={userId} />
      <Wrapper>
        {userData ? (
          <>
            <Location location={location} setLocation={setLocation} />
            <PostListWrapper>
              <PostList location={location} userId={userId} />
            </PostListWrapper>
          </>
        ) : (
          <>
            <Location location={location} setLocation={setLocation} />
            <p>유저 정보를 불러오는 중...</p>
          </>
        )}
        <div style={{ height: "60px" }} />
      </Wrapper>
    </Container>
  );
};

export default CommunityPage;

/* ================= styled ================= */
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
  height: 100%;
  padding-top: 52px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;
