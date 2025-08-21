import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PostListItem from "./PostListItem";
import { community } from "../../../mocks/community"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// `location` prop을 받도록 수정
const PostList = ({ location }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedPosts;
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          // 목데이터를 location 값에 따라 필터링
          fetchedPosts = community.filter(post => post.location === location);
        } else {
          // 쿼리 스트링을 포함한 API 호출
          const res = await axios.get(`${BASE_URL}/api/missions/posts?location=${location}`);
          fetchedPosts = res.data;
        }
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("게시물을 불러오는 데 실패했습니다.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    // location이 변경될 때마다 fetchPosts 함수 호출
    fetchPosts();
  }, [location]); // 의존성 배열에 location 추가

  if (loading) return <Message>로딩중...</Message>;
  if (error) return <Message>{error}</Message>;
  if (!posts.length) return <Message>해당 지역의 게시물이 없습니다.</Message>;

  return (
    <Container>
      {posts.map((post) => (
        <PostListItem key={post.postId ?? post.id} post={post} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 92%;
  padding: 1rem 1rem;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export default PostList;