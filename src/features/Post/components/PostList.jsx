import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PostListItem from "./PostListItem";
import { community } from "../../../mocks/community"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// `location` prop을 받도록
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
        fetchedPosts = community
          .filter(post => post.location === location)
          .sort((a, b) => b.heartCount - a.heartCount); // 💡 내림차순 정렬
      } else {
        const res = await axios.get(`${BASE_URL}/api/missions/posts?location=${location}`);
        fetchedPosts = res.data.sort((a, b) => b.heartCount - a.heartCount); // 💡 내림차순 정렬
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

  fetchPosts();
}, [location]);


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