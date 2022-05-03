import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from '../../services/utils'
import { followUser, unfollowUser } from '../../actions/user.actions';


const FollowHandler = ({idToFollow}) => {
    const userData = useSelector(state => state.userReducer)
    const [isFollowed, setIsFollowed] = useState(false)
    const dispatch = useDispatch()

    const handleFollow = () => {
        dispatch(followUser(userData._id,idToFollow ))
        setIsFollowed(true)
    }

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
      };

    useEffect(() => {
        if(!isEmpty(userData.following)){
            if(userData.following.includes(idToFollow)){
                setIsFollowed(true)
            }
        }else{
            setIsFollowed(false)
        }

    }, [userData,idToFollow ])
  return (
    <>
    {isFollowed && !isEmpty(userData)
    ? ( <span onClick={handleUnfollow}><button className="unfollow-btn" >Abonné</button></span>) 
    : ( <span onClick={handleFollow}><button>Suivre</button></span>) }
   
    </>
  )
}

export default FollowHandler