import React from 'react'
import styled from 'styled-components'

const HistoryContainer = styled.div`
  padding: 18px;
`
const HeaderContainer = styled.div`
  overflow: hidden;
`
const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #666;
`
const RemoveText = styled.span`
  float: right;
  color: #a7a7a7;
`

const ListContainer = styled.ul`
  margin: 10px 0;
`

const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.span`
  float: right;
  color: #0cde8b;
  border : none;
`

const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`

const SearchHistory = () => {
  
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색</Title>
        <RemoveText>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
            <KeywordContainer>
              <Keyword></Keyword>
              <RemoveButton>
                X
              </RemoveButton>
            </KeywordContainer>

      </ListContainer>
    </HistoryContainer>
  )
}

export default SearchHistory