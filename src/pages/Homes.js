import React , {useContext} from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Log from "../components/Log/index"
import {UidContext } from "../components/AppContext"



const Homes = () => {
  const uid = useContext(UidContext)

  return (
    <div className="home">
      <LeftNav/>
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread/>

      </div>
    </div>
  )
}

export default Homes