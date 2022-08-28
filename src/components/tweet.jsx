import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, onSnapshot, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../jsconfig';
import Moment from 'react-moment';
import { async } from '@firebase/util';

const Tweet = ({ item, user, date, tweets }) => {


    const [Like, setLike] = useState();
    const [LikeActive, setLikeActive] = useState(false);
    const [Comments, setComments] = useState([]);
    const [SelectedTweet, setSelectedTweet] = useState(null);
    const [Blankinput, setBlankinput] = useState(true);
    const commentsCollecton = collection(db, "comments");


    const checkinput = (value) => {
        if (value != '') {
            setBlankinput(false);
        }
        else {
            setBlankinput(true);
        }
    }

    const getComments = async () => {

        onSnapshot(commentsCollecton, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({ ...doc.data() })))
        })
    }


    const likefunction = async (id, likes) => {
        if (LikeActive) {

            if (likes > 0) {
                likes--;
            }
            const tweetDoc = doc(db, `tweets/${id}`);
            const newFields = { likes: likes }
            await updateDoc(tweetDoc, newFields)


            setLike(0)
            setLikeActive(false);
        }
        else {

            likes++;

            const tweetDoc = doc(db, `tweets/${id}`);
            const newFields = { likes: likes }
            await updateDoc(tweetDoc, newFields)

            setLike(1)
            setLikeActive(true);
        }
    }

    const deleteTweet = async (id) => {
        const userDoc = doc(db, `tweets/${id}`);
        await deleteDoc(userDoc);

        const q = query(commentsCollecton, where("commentid", "==", id));
        const snapshot = await getDocs(q);

        const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        results.forEach(async (result) => {
            const commentDoc = doc(db, "comments", result.id);
            await deleteDoc(commentDoc);
        });
    }

    const openComments = async (itm) => {
        setSelectedTweet(itm);
    }




    const addComment = async (id, comments) => {


        await addDoc(commentsCollecton,
            {
                userid: user.uid,
                commentid: SelectedTweet.id,
                text: document.querySelector(".comment__input").value,
                username: user.displayName,
                date: date,
                profilepicture: user.photoURL,
                likes: Number(0)
            }
        )

        const tweetDoc = doc(db, `tweets/${id}`);
        const newFields = { comments: comments + 1 }
        await updateDoc(tweetDoc, newFields)

    }

    const closeComment = async () => {
        setSelectedTweet(null)
    }

    useEffect(() => {
        getComments();
       
    }, [])


    return (
        <>
            {
                SelectedTweet &&
                <div className="comments__section">
                    <div className="comments__block">
                        <div className="comment__para">
                            <div className="main__tweet">
                                <figure className='tweet__profile main__tweet--profile'>
                                    <img src={SelectedTweet.profilepicture || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} alt="" />
                                </figure>
                                <div className="tweet__para">
                                    <div className="tweet__name--date">
                                        <p className='tweet__name'>{item.name}</p>
                                        <p className='tweet__date'><Moment fromNow>{item.date}</Moment></p>
                                    </div>
                                    <div className="tweet__para--main">
                                        <span>{item.tweet}</span>
                                    </div>
                                </div>
                                <div className="close__comment--section" onClick={closeComment}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" className='comment-xmark'/>
                                </div>
                            </div>
                            <div className="comment__block--wrapper">
                            {
                                Comments && Comments.map(item =>
                                    item.commentid == SelectedTweet.id &&
                                    <div className="comment__block">
                                        <figure className='tweet__profile comment__profile'>
                                            <img src={item.profilepicture || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} alt="" className='smaller' />
                                        </figure>
                                        <div className="comment__desc">
                                            <div className="tweet__name--date">
                                                <p className='tweet__name'>{item.username}</p>
                                                <p className='tweet__date'><Moment fromNow>{item.date}</Moment></p>
                                            </div>
                                            <div className="tweet__para--main">
                                                <span>{item.text}</span>
                                            </div>
                                        </div>
                                    </div>)
                            }
                            </div>
                            {
                                user?.displayName &&
                                <>
                                    <div className="add__comment--block">
                                        <figure className='tweet__profile'>
                                            <img src={user.photoURL || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} alt="" />
                                        </figure>
                                        <div className="comment__input--wrapper">
                                            <input type="text" className='comment__input input' placeholder='Your reply here' onChange={(event) => checkinput(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="features__border no-border">
                                        <div className="features__wrapper">
                                            <div className="features">
                                                <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g></svg>
                                                <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path><path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"></path></g></svg>
                                                <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z"></path></g></svg>
                                            </div>
                                            {
                                                Blankinput ?
                                                    <div className="button__wrapper blank">
                                                        <span>Reply</span>
                                                    </div>
                                                    :
                                                    <div className="button__wrapper">
                                                        <span onClick={() => addComment(item.id, item.comments)}>Reply</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
            <div className='tweet__block'>
                <figure className='tweet__profile'>
                    <img src={item.profilepicture || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} referrerpolicy="no-referrer" />
                </figure>
                <div className="tweet__para">
                    <div className="tweet__name--date">
                        <p className='tweet__name'>{item.name}</p>
                        <p className='tweet__date'><Moment fromNow>{item.date}</Moment></p>
                    </div>
                    <div className="tweet__para--main">
                        <span>{item.tweet}</span>
                    </div>
                    <div className="tweet__features">
                        <div><svg viewBox="0 0 24 24" className='comment' onClick={() => openComments(item)} aria-hidden="true"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>{item.comments}</div>
                        {
                            user.uid == item.userid
                                ?
                                <div><svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteTweet(item.id)} viewBox="0 0 24 24" width="24px" height="24px" className='trash'><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" /></svg></div>
                                :
                                <div><svg viewBox="0 0 24 24" className='retweet' aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></div>
                        }
                        <div><svg viewBox="0 0 24 24" onClick={() => likefunction(item.id, item.likes)} className='like' aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>{item.likes}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tweet;
