import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {getPosts} from '../../actions/post.action'
import { useSelector } from 'react-redux'
import {isEmpty} from '../../services/utils'
import Card from '../Post/Card'

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer);
  const userData = useSelector(state => state.userReducer);

  const loadMore = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoadPost(true);
      setCount(count + 5)
    }

  }

  useEffect(() =>{
    if(loadPost){
      dispatch(getPosts(count));
      setLoadPost(false);
    }
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, userData, posts])
  return (
    <div className="thread-container">
          <ul>
            {!isEmpty(posts[0]) && 
            posts.map((post) => {
/*               if(!isEmpty(userData)){
                if(userData.following.includes(post.posterId) ){
                  return <Card post={post} key={post._id}/>;
                }
                if(post.posterId === userData._id){ */
                  return <Card post={post} key={post._id}/>;
/*                 }
              }
              else{
                return null
              }
 */

            })}
          </ul>
    </div>
  )
}

export default Thread