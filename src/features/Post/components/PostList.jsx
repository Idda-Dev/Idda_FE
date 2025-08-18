import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PostListItem from "./PostListItem";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. .env 파일을 확인하세요.");
          setPosts([]); // BASE_URL 없으면 빈 배열 세팅
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/missions/posts`);

        setPosts(res.data);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!posts.length) return <div>게시물이 없습니다.</div>;

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

export default PostList;
