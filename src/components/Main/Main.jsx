import React from 'react'
import ShowSpinner from '../ShowSpinner/ShowSpinner'
import useJsonFetch from '../../hooks/useJsonFetch'
import moment from 'moment'
import styled from 'styled-components'
import CreatePost from '../CreatePost/CreatePost'
import { Link } from 'react-router-dom'

const Element = styled.ul`
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  a:not(:first-child) {
    margin-top: 15px;
  }
`
const Post = styled.li`
  padding: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background-color: white;

  :not(:first-child) {
    margin-top: 15px;
  }

  img {
    height: 40px;
  }
`
const PostName = styled.div`
  color: blue;
`
const PostContent = styled.p`
  white-space: pre-wrap;
  font-weight: bold;

  ::before {
    content: '';
    display: block;
    width: 95%;
    height: 2px;
    margin: 10px auto;
    background-color: #808080;
  }
`

export default function Main() {
  const [loading, error, data] = useJsonFetch(process.env.REACT_APP_URL_POSTS)

  const onClick = (event) => {
    localStorage.setItem('selectedPost', event.target.closest('a').dataset.data)
  }

  return (
    <div>
      <CreatePost />
      {loading && <ShowSpinner />}
      {error && <div>{error.message}</div>}
      {data && (
        <Element>
          {data.map((data) => (
            <Link
              to={`/posts/${data.id}`}
              key={data.id}
              data-data={JSON.stringify(data)}
              onClick={onClick}
            >
              <Post>
                <img src={data.avatar} alt={data.name} />
                <PostName>{data.name}</PostName>
                <span>{moment(data.created).fromNow()}</span>
                <PostContent>{data.content}</PostContent>
              </Post>
            </Link>
          ))}
        </Element>
      )}
    </div>
  )
}
