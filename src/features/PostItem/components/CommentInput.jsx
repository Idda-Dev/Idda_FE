import React, { useState } from "react";
import styled from "styled-components";
import PencilIcon from "../assets/PencilIcon.png";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentInput = ({ postId, userId, onCommentAdded, refreshComments }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const submit = async () => {
    const content = text.trim();
    if (!content || submitting) return;
    setSubmitting(true);
    try {
      // 1) 서버에 먼저 저장
      const res = await axios.post(
        `${BASE_URL}/api/users/${userId}/posts/${postId}/comments`,
        { content }
      );

      await refreshComments?.();

      // 2) 생성 결과 획득 (body 우선, 없으면 Location으로 GET)
      let newComment = res.data;
      const location = res.headers?.location || res.headers?.Location;
      if (!newComment && location) {
        const r = await axios.get(`${BASE_URL}${location}`);
        newComment = r.data;
      }

      // 3) 부모에 알림 (실 ID로 바로 목록에 추가)
      if (newComment) onCommentAdded?.(newComment);

      // 4) 입력 초기화
      setText("");
    } catch (err) {
      console.error("댓글 전송 실패:", err);
      // 필요하면 토스트/알럿
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !isComposing) {
      // ✅ IME 조합 중이면 무시
      e.preventDefault();
      await submit();
    }
  };

  return (
    <Container>
      <InputWrapper>
        {!text && !submitting && (
          <Placeholder>
            댓글을 입력하세요.
            <Icon src={PencilIcon} alt="댓글 아이콘" />
          </Placeholder>
        )}
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder=""
          disabled={submitting}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </InputWrapper>
    </Container>
  );
};

export default CommentInput;
const Container = styled.div`
  width: 73%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Placeholder = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.8rem;
  pointer-events: none;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  object-fit: contain;
`;

const Input = styled.input`
  width: 70%;
  padding: 0.5rem 2rem;
  border-radius: 36px;
  border: 1px solid #6f69b0;
  outline: none;
  font-size: 0.8rem;

  /* ✅ 라이트 모드 고정 */
  background-color: #ffffff;
  color: #000000;

  /* placeholder도 강제 */
  &::placeholder {
    color: #999999;
  }
`;
