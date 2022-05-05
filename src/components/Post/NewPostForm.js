import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import { isEmpty, timestampParser } from '../../services/utils'
import {addPost, getPosts} from '../../actions/post.action'

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null)
    const [video, setVideo] = useState('')
    const [file, setFile] = useState();
    const userData = useSelector(state => state.userReducer)
    const error = useSelector(state => state.errorReducer.postError)
    const dispatch = useDispatch();


    const handlePost =async () => {

        if(message || postPicture || video){
            const data = new FormData();
            data.append('posterId', userData._id)
            data.append('message', message)
            if(file){
                data.append('file', file)
            }
                data.append('video', video)
              
                await dispatch(addPost(data));
                dispatch(getPosts());
                cancelPost()
           
         
        }else{
            alert("Veuillez entrer un message")
        }

    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo("")
    }


    const cancelPost = () => {
        setVideo("")
        setMessage("")
        setPostPicture("")
        setFile("")

    }

    const handleVideo = () => {
        let findLink = message.split(' ');
        for(let i = 0 ; i < findLink.length; i++){
            if(findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')){
                let embed = findLink[i].replace('watch?v=', "embed/");
                setVideo(embed.split('&')[0])
                findLink.splice(i, 1);
                setMessage(findLink.join(" "))
                setPostPicture("")


            }
        }
    }
    useEffect(() => {
        if (!isEmpty(userData)) {
            setIsLoading(false)
        }
        handleVideo();

    }, [userData, message, video])
    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            )
                :
                (
                    <>
                        <div className="data">
                            <p>
                                <span>{userData.following ? userData.following.length : 0}</span>{" "}
                                Abonnement{userData.following && userData.following.length > 1 ? "s" : ""}
                            </p>
                            <p>
                                <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
                                Abonné{userData.followers && userData.followers.length > 1 ? "s" : ""}
                            </p>
                        </div>
                        <NavLink to="/profil" exact="true">
                            <div className="user-info">
                                <img src={userData.picture} alt="picture profil" />
                            </div>
                        </NavLink>
                        <div className="post-form">
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Quoi de neuf"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {message || postPicture || video.length > 20 ? (
                                <div className="card-container">
                                    <div className="card-left">
                                    <img src={userData.picture} alt="picture profil" />
                                    </div>
                                    <div className="card-right">
                                        <div className="card-header">
                                            <div className="pseudo">
                                                <h3>{userData.pseudo}</h3>
                                            </div>
                                            <span>{timestampParser(Date.now())}</span>
                                        </div>
                                        <div className="content">
                                            <p>{message}</p>
                                            {postPicture && <img src={postPicture} alt="picture post"/>}
                                            {video && (
                                                <iframe 
                                                src={video} 
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                
                                                >

                                                </iframe>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                                :
                                null
                        }
                            <div className="footer-form">
                                <div className="icon">
                                    {isEmpty(video) && (
                                        <>
                                            <img src="./img/icons/picture.svg" alt="icon picture" />
                                            <input type='file' name="file" id="file-upload" accept='.jpg, .jpeg, .png'
                                                onChange={e => handlePicture(e)} />
                                        </>
                                    )}
                                    {video && (
                                        <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                                    )}
                                </div>
                                {!isEmpty(error.format) && (
                                        <p>{error.format}</p>
                                    )}
                                    {!isEmpty(error.maxSize) && (
                                        <p>{error.maxSize}</p>
                                    )}
                                {message || postPicture || video.length > 20 ?
                                    <div className="btn-send">
                                        <button className="cancel" onClick={cancelPost}>Annuler</button>
                                        <button className="send" onClick={handlePost}>Envoyer</button>
                                    </div>
                                    : 
                                    null
                                }

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NewPostForm