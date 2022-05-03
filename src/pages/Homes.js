import React, {useEffect, useState} from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import { useDispatch } from 'react-redux'
import {getPosts} from '../actions/post.action'
import { useSelector } from 'react-redux'




const Homes = () => {

  return (
    <div className="home">
      <LeftNav/>
      <Thread/>
    </div>
  )
}

export default Homes