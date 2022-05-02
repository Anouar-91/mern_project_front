import React, {useState} from 'react'
import LeftNav from '../LeftNav'
import UploadImg from './UploadImg'
import { useDispatch , useSelector} from 'react-redux';
import {updateBio} from '../../actions/user.actions'
import {dataParser} from '../../services/utils'


const UpdateProfil = () => {
  const userData = useSelector(state => state.userReducer )
  const [bio, setBio] = useState()
  const [updateForm, setUpdateForm] = useState(false)
  const dispatch = useDispatch()

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateBio(bio, userData._id));
    setUpdateForm(!updateForm)
  }
  return (
    <div className="profil-container">
      <LeftNav/>
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic"/>
          <UploadImg/>
  {/*         <p>{error.maxSize}</p>
          <p>{error.format}</p> */}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm ? (<>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
            </>)
            :(
              <>
              <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
              <button onClick={handleUpdate}>Valider Modification</button>

              </>
            )}
          </div>
          <br/>
          <h4>Membre depuis le : {dataParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfil