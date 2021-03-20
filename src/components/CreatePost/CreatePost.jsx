import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Element = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: white;
  padding: 10px;
  margin-bottom: 30px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

  a {
    font-size: inherit;
    padding: 10px;
    cursor: pointer;
    color: white;
    background-color: #7171ff;
    text-decoration: none;
  }
`

export default function CreatePost() {
  return (
    <Element>
      <Link to="/new">Создать Пост</Link>
    </Element>
  )
}
