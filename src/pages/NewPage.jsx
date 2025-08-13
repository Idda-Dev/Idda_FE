import React from "react";
import styled from "styled-components";
import TabBar from "../components/TabBar";
import CommentInput from "../features/PostItem/components/CommentInput";
import Comments from "../features/PostItem/components/Comments";
import Post from "../features/PostItem/components/Post";
import Header from "../features/PostItem/components/Header";

const NewPage = () => {
  return (
    <Container>
      <Header/>
      <Post/>
      <Comments/>
      <CommentInput/>
      <TabBar/>
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative; 
`;


export default NewPage;



