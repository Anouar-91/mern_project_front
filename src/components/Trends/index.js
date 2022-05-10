import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from '../../services/utils'
import { getTrends } from '../../actions/post.action'
import { NavLink } from 'react-router-dom'

const Trends = () => {
  const posts = useSelector(state => state.allPostsReducer)
  const usersData = useSelector(state => state.usersReducer)
  const trendList = useSelector(state => state.trendingReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i])
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length
      })
      sortedArray.length = 3
      dispatch(getTrends(sortedArray))
    }
  }, [posts, dispatch])
  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact="true" to="/trending">
        <ul>
          {trendList.length >0 &&
            trendList.map((post) => {
              return(
              <li key={post._id}>
                {post.picture && <img src={post.picture} alt="post picture" />}
                {post.video && (
                  <iframe
                    width="500"
                    height="300"
                    src={post.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={post._id}
                  ></iframe>
                )}
                {isEmpty(post.picture) && isEmpty(post.video) && (
                  <img src={usersData[0] && usersData.map((user) => {
                    if (user._id === post.posterId) {
                      return user.picture
                    }
                    else return null
                  }).join(' ')} alt="pic pp" />
                )}
                <div className="trend-content">
                  <p>{post.message}</p>
                </div>
              </li>)
            })
          }
        </ul>
      </NavLink>
    </div>
  )
}

export default Trends