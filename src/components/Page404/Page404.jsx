import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Post = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background-color: white;

  a {
    align-self: center;
    font-size: inherit;
    padding: 10px;
    cursor: pointer;
    color: white;
    background-color: #7171ff;
    text-decoration: none;
  }
`

export default function Page404() {
  return (
    <Post>
      <Link to="/">На Главную</Link>
    </Post>
  )
}
