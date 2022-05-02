import React, { useState, useEffect } from 'react'
import Routes from './components/Routes'
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
/* import { getUser } from './redux' */
import {getUser} from './actions/user.actions'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchToken = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
        .then((res) => {
          // handle success
          console.log(res);
          setUid(res.data)
/*           if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, { withCredentials: true })
              .then((response) => {
                dispatch(getUser(response.data))
              })
              .catch((err) => {
                console.log(err)
              })
          } */
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }
    fetchToken();
    dispatch(getUser(uid))
  }, [uid])


  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  )
}

export default App