import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBarContainer = styled.div`
  border: 2px solid #000;
  border-radius: 10px; 
`

//글자를 입력하면 RemoveIcon이 나오게 되고 누르면 input의 value값이 사라집니다
const RemoveButton = styled.span``

const InputContainer = styled.div``

const Input = styled.input`
  width: 90%;
  type: search;
  background-color: #fff;
  border : none;
  font-weight: 700;
  font-size: 20px;
`

const SearchBar = () => {
 
  return (
    <SearchBarContainer>
      <InputContainer>
        <FontAwesomeIcon icon={faSearch} />
        <Input
          placeholder="검색"
        />
        <RemoveButton>X</RemoveButton>
      </InputContainer>
    </SearchBarContainer>
  )
}

export default SearchBar