import React from 'react'
import styled from 'styled-components'
import spinner from './Loading_icon.gif'

const Spinner = styled.img`
  width: 100px;
  height: 100px;
`

export default function ShowSpinner() {
  return <Spinner src={spinner} alt="Loading"></Spinner>
}
