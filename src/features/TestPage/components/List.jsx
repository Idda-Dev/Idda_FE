import React from 'react'
import styled from 'styled-components'
import ListItem from './ListItem'

const List = () => {
  return (
    <Container>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        
    </Container>
  )
}

export default List;

const Container=styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
`