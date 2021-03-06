import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost  } from '../../actions/post.action'
import { isEmpty, dateParser } from '../../services/utils'
import FollowHandler from '../Profil/FollowHandler'
import LikeButton from './LikeButton'
import DelelePost from './DelelePost'
import CardComment from './CardComment'

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector(state => state.usersReducer)
    const userData = useSelector(state => state.userReducer)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdated, setTextUpdated] = useState(null)
    const [showComments, setShowComments]= useState(false)
    const dispatch = useDispatch()

    const updateItem =  () => {
        if(textUpdated){
         dispatch(updatePost(post._id, textUpdated))
        }
        setIsUpdated(!isUpdated)

    }
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])
    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            )
                :
                (
                    <>
                        <div className="card-left">
                            <img
                                src={!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) {
                                            return user.picture
                                        }
                                        else{
                                            return null
                                        }
                                    }).join('')
                                } alt="post-pic"/>
                        </div>
                        <div className="card-right">
                            <div className="card-header">
                                <div className="pseudo"><h3>{!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) {
                                            return user.pseudo
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                }</h3>
                               
                                    {!isEmpty(userData) && post.posterId !== userData._id  && 
                                        (<FollowHandler idToFollow={post.posterId} type="card" />)
                                    }
                                </div>
                                <span>{dateParser(post.createdAt)}</span>
                            </div>
                            {!isUpdated && <p>{post.message}</p>}
                            {isUpdated && (
                                <div className="update-post">
                                    <textarea 
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdated(e.target.value)}
                                    />
                                    <div className="button-container">
                                        <button className="btn" onClick={updateItem}>Valider modifications</button>
                                    </div>
                                </div>
                            )}
                            {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
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
                            {userData._id === post.posterId && (
                                <div className="button-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <img src="./img/icons/edit.svg" alt="edit"/>
                                    </div>
                                    <DelelePost id={post._id}/>
                                </div>
                            )}
                            <div className="card-footer">
                                <div className="comment-icon">
                                    <img src="./img/icons/message1.svg" alt="comment" onClick={() => setShowComments(!showComments)}/>
                                    <span>{post.comments.length}</span>
                                </div>
                                <LikeButton post={post}/>
                                <img src="./img/icons/share.svg" alt="share" />
                            </div>
                            {showComments && <CardComment post={post} />}
                        </div>
                    </>
                )
            }
        </li>
    )
}

export default Card