import React, { useState, useEffect } from 'react'
import LeftNav from '../LeftNav'
import UploadImg from './UploadImg'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.action'
import { dateParser } from '../../services/utils'
import FollowHandler from './FollowHandler'
import {isEmpty} from '../../services/utils'


const UpdateProfil = () => {
  const userData = useSelector(state => state.userReducer)
  const [bio, setBio] = useState("")
  const [updateForm, setUpdateForm] = useState(false)
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)
  const usersData = useSelector(state => state.usersReducer)
  const error = useSelector(state => state.errorReducer.userError)
  const dispatch = useDispatch()

  const handleUpdate = (e) => {
    e.preventDefault()
    if(userData.bio !== bio){
      dispatch(updateBio(bio, userData._id));
    }
    setUpdateForm(false)
  }
  
  useEffect(() => {
    if(userData){
      setBio(userData.bio)
    }
  }, [userData])
  return isEmpty(userData) && isEmpty(usersData) ?  (
    <>
        <div className="loader"></div>
    </>
  )
  :
   (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm ? (<>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
            </>)
              : (
                <>
                  <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                  <button onClick={handleUpdate}>Valider Modification</button>

                </>
              )}
          </div>
          <br />
          <h4>Membre depuis le : </h4>
          <p>{dateParser(userData.createdAt)}</p>
          <h5 onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? (userData.following.length) : (0)}</h5>
          <h5 onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? (userData.followers.length) : (0)}</h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements &nbsp; &nbsp;</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>&#10005;</span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type="suggestion" />
                        </div>
                      </li>
                    )
                  }
                }
              })
              }
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés &nbsp; &nbsp;</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>&#10005;</span>
            <ul>
              {
                  usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length ; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="pic" />
                            <h4>{user.pseudo}</h4>
                            <div className="follow-handler">
    
                            <FollowHandler idToFollow={user._id} type="suggestion"  />
                          </div>
                          </li>
                        )
                      }
                    }
                  })
              }
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil