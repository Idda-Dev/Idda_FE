import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentModalPage = ({ isOpen, onClose, isMyComment, comment, userId, onCommentChange }) => {
  const [view, setView] = useState('default');
  const [editContent, setEditContent] = useState(comment.content);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (view === 'edit' && editInputRef.current) {
      editInputRef.current.focus();
      const length = editInputRef.current.value.length;
      editInputRef.current.setSelectionRange(length, length);
    }
  }, [view]);

  if (!isOpen) {
    if (view !== 'default') setView('default');
    return null;
  }

  const handleEditClick = () => {
    setEditContent(comment.content);
    setView('edit');
  };

  const handleCancelEdit = () => {
    setView('default');
  };

  const handleSaveEdit = async () => {
    if (!editContent || editContent === comment.content) {
      handleCancelEdit();
      return; 
    }
    
    try {
      await axios.patch(`${BASE_URL}/api/users/${userId}/posts/${comment.postId}/comments/${comment.commentId}`, {
  content: editContent
});
      if (onCommentChange) onCommentChange(); // 수정 후 전체 refresh
      setView('default');
      onClose();
    } catch (err) {
      console.error("댓글 수정 실패:", err);
      setView('default');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}/posts/${comment.postId}/comments/${comment.commentId}`);
      if (onCommentChange) onCommentChange(comment.commentId); // 삭제된 ID 전달
      onClose();
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  const renderContent = () => {
    if (view === 'edit') {
      return (
        <EditView>
          <EditTitle>댓글 수정</EditTitle>
          <EditInput 
            ref={editInputRef}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <EditButtonGroup>
            <EditButton1 onClick={handleCancelEdit}>취소</EditButton1>
            <EditButton2 onClick={handleSaveEdit}>저장</EditButton2>
          </EditButtonGroup>
        </EditView>
      );
    }

    return (
      <DefaultView>
        <DefaultButtonGroup>
          {isMyComment ? (
            <>
              <ActionButtonTop onClick={handleEditClick}>수정</ActionButtonTop>
              <Divider />
              <ActionButtonBottom onClick={handleDelete}>삭제</ActionButtonBottom>
            </>
          ) : (
            <>
              <ActionButtonTop onClick={onClose}>신고</ActionButtonTop>
              <Divider />
              <ActionButtonBottom onClick={onClose}>차단</ActionButtonBottom>
            </>
          )}
        </DefaultButtonGroup>
        <BottomButton onClick={onClose}>취소</BottomButton>
      </DefaultView>
    );
  };

  return (
    <Overlay isEditView={view === 'edit'} onClick={onClose}>
      <Modal isEditView={view === 'edit'} onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </Modal>
    </Overlay>
  );
};

export default CommentModalPage;

// Styled-components 생략 (위 코드와 동일)


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: ${props => props.isEditView ? 'center' : 'flex-end'};
  z-index: 999;
`;

const Modal = styled.div`
  width: ${props => props.isEditView ? '60%' : '280px'};
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: ${props => props.isEditView ? '0' : '1rem'};
`;

const DefaultView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditView = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditTitle = styled.h3`
  margin-top: 0;
  width: 100%;
  padding: 0.85rem;
  color: #333;
  border-bottom: 1px solid;
  font-size: 0.8rem;
`;

const EditInput = styled.textarea`
  width: 100%;
  height: 13rem;
  padding: 0 1.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.8rem;
  box-sizing: border-box; 
  resize: none; 
  outline: none; 
  caret-color: #B1AAFF;
  &:focus {
    outline: none;
  }
`;

const DefaultButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EditButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.85rem;
  border-top: 1px solid;
`;

const CommonButton = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  
  &:hover { background-color: #F0F0F0; }
  &:focus { outline: none; }
`;

const ActionButtonTop = styled(CommonButton)`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const ActionButtonBottom = styled(CommonButton)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #6F69B0;
`;

const BottomButton = styled(CommonButton)`
  margin: 1rem 0 1rem 0;
  color: #6F69B0;
`;

const EditButton1 = styled.button`
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  background-color: #D9D9D9;
  color: #444444;
  font-size: 0.75rem;
  &:focus { outline: none; }
`;

const EditButton2 = styled.button`
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  background-color: #B1AAFF;
  color: white;
  font-size: 0.75rem;
  &:focus { outline: none; }
`;