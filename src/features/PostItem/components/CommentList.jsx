// CommentList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentListItem from "./CommentListItem";
import styled from 'styled-components';
import { comments as mockComments } from '../../../mocks/comments'; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentList = ({ postId, userId = 1 }) => { 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다. 목데이터를 사용합니다.");
          setComments(mockComments);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/users/${userId}/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setComments(mockComments);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, userId]);

  if (loading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  return (
    <Wrapper>
      {comments.map((comment) => (
        <CommentListItem 
          key={comment.commentId} 
          comment={comment} // ⭐️ comment 객체 전체를 전달
          userId={userId} // userId도 함께 전달
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export default CommentList;