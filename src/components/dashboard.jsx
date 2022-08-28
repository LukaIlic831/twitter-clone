import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../jsconfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import Tweet from './tweet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import { auth } from '../jsconfig';
import { useNavigate } from 'react-router';

const Dashboard = ({ user }) => {

    const [Blankinput, setBlankinput] = useState(true);
    const [Tweets, setTweets] = useState(null);
    const userCollectionRef = collection(db, "tweets");
    const date = new Date().toLocaleString();
    const navigate = useNavigate();



    const getTweets = async () => {

        onSnapshot(userCollectionRef, (snapshot) => {
            setTweets(snapshot.docs.map(doc => ({ ...doc.data() })))
        })
    }

    const checkinput = (value) => {
        if (value != '') {
            setBlankinput(false);
        }
        else {
            setBlankinput(true);
        }
    }

    const openMobileMenu = () => {
        document.querySelector(".mobile__logout--block").classList.toggle("mobile__logout--block-open");
    }

    const addTweet = async () => {
        const inputValue = document.querySelector(".input").value;
        const userCollectionRef2 = doc(db, `tweets/${Tweets.length + 1}`);

        await setDoc(userCollectionRef2,
            {
                id: Tweets.length + 1,
                userid: user.uid,
                name: user.displayName,
                profilepicture: user.photoURL,
                tweet: inputValue,
                likes: Number(0),
                date: date,
                comments: Number(0),
            }
        )

        getTweets();
    }

    const logout = async () => {
        document.querySelector(".loading__bg").style.display = "flex";
        await signOut(auth).then(() => {
            document.querySelector(".loading__bg").style.display = "none";
            navigate('/')
        });
    }


    useEffect(() => {
        getTweets();
    }, [])


    return (
        <div className='dashboard__wrapper'>
            {
                user?.displayName &&
                <div className="mobile__logout--block">
                    <div className="mobile__logout--block-profile-wrapper">
                        <div className='mobile__logout--block-profile'>
                            <img src={user.photoURL || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} referrerpolicy="no-referrer" />
                            <div className="mobile__logout--block-profile-name-wrapper">
                                <p className='mobile__logout--block-profile-name'>{user.displayName}</p>
                            </div>
                        </div>
                        <div className="mobile__logout--block-dots check">
                            <FontAwesomeIcon icon="fa-solid fa-check" />
                        </div>
                    </div>
                    <div className="mobile__logout" onClick={logout}>
                        <p>Log out {user.displayName}</p>
                    </div>
                </div>
            }
            <div className="home__wrapper">
                <p>Home</p>
                <FontAwesomeIcon icon="fa-solid fa-bars" className='bars' onClick={openMobileMenu} />
                <svg viewBox="0 0 24 24" fill='white' className='decoration' aria-hidden="true"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g></svg>
            </div>
            <div className="input__wrapper">
                {
                    user?.displayName &&
                    <figure className='input__img'>
                        <img src={user.photoURL || "https://res.cloudinary.com/practicaldev/image/fetch/s--y56XRpC7--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/463848/306fb30f-bb30-47c8-afbb-ee003c3266f6.png"} referrerpolicy="no-referrer" />
                    </figure>
                }
                <input type="text" className='input' onChange={(event) => checkinput(event.target.value)} placeholder="What's happening?" />
            </div>
            <div className="features__border">
                <div className="features__wrapper">
                    <div className="features">
                        <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g></svg>
                        <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path><path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"></path></g></svg>
                        <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z"></path></g></svg>
                    </div>
                    {
                        Blankinput ?
                            <div className="button__wrapper blank">
                                <span>Tweet</span>
                            </div>
                            :
                            <div className="button__wrapper">
                                <span onClick={addTweet}>Tweet</span>
                            </div>
                    }
                </div>
            </div>
            {
                Tweets ?
                    Tweets.map(item =>
                        <Tweet item={item} date={date} tweets={Tweets} userCollectionRef={userCollectionRef} user={user} />
                    )
                    :
                    <div className='loading__bg flex'>
                        <svg viewBox="0 0 24 24" fill='rgb(29, 155, 240)' aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                    </div>
            }
        </div>
    );
}

export default Dashboard;
