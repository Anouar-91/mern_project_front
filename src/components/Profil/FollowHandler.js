import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from '../../services/utils'
import { followUser, unfollowUser } from '../../actions/user.action';


const FollowHandler = ({idToFollow, type}) => {
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
    ? ( <span onClick={handleUnfollow}>
        {type=="suggestion" 
          ? ( <button className="unfollow-btn" >Abonné</button>)
          : (<img src="./img/icons/checked.svg" alt="checked"/>)
           } 
      </span>) 
    : ( <span onClick={handleFollow}>
            {type=="suggestion" ? 
          (<button>Suivre</button>)
          :(<img src="./img/icons/check.svg" alt="check"/>)
    }
        </span>) }
   
    </>
  )
}

export default FollowHandler