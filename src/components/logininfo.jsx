import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../jsconfig';
import { provider } from '../jsconfig';
import { signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Logininfo = () => {

    const navigate = useNavigate();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const register = async (event) => {
        try{
            event.preventDefault();
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
           
            await updateProfile(auth.currentUser, {
                displayName: registerUsername
              })
              document.querySelector('.error__block2').style.display = "none";
            navigate('/main')
        }
        catch(error){
            console.log(error)
           registerPassword.length < 6 &&  (document.querySelector('.error__block2').style.display = "flex")
            if(error.code == "auth/email-already-in-use"){
                document.querySelector('.txt').innerHTML = "Email already in use";
                document.querySelector('.error__block2').style.display = "flex";
            }
        }
        
    }

    const login = async (event) => {
        try{
            event.preventDefault();
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
           
            navigate('/main')
        }
        catch(error){
            document.querySelector('.error__block1').style.display = "flex";
            if(error.code == "auth/email-already-in-use"){
                alert("Email already in use")
            }
        }
    } 

    const opensignin = () => {
        document.querySelector(".signin__wrapper").style.display = "flex";
    }

    const closesignin = () => {
        document.querySelector(".signin__wrapper").style.display = "none";
    }

    const opensignup = () => {
        document.querySelector(".signup__wrapper").style.display = "flex";
    }

    const closesignup = () => {
        document.querySelector(".signup__wrapper").style.display = "none";
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            navigate('/main');
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='login-info__wrapper'>
            <div className="login-info__twitter">
                <svg viewBox="0 0 24 24" fill='rgb(214, 217, 219)' aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
            </div>
            <div className="login-info__title">
                <p>Happening now</p>
            </div>
            <div className="login-info__subtitle">
                <p>Join Twitter today.</p>
            </div>
            <div className="login-info__buttons">
                <div className='login-info__button' onClick={signInWithGoogle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                    <p>Sign in with Google</p>
                </div>
                <div className='login-info__button apple'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 315" version="1.1" preserveAspectRatio="xMidYMid">
                        <g>
                            <path d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249" fill="#000000" />
                        </g>
                    </svg>
                    <p>Sign in with Apple</p>
                </div>
            </div>
            <div className="login-info__or">
                <span></span>
                <p>or</p>
                <span></span>
            </div>
            <div className="login-info__signup" onClick={opensignup}>
                <a>Sign up with email and password</a>
            </div>
            <div className="login-info__privacy">
                By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span> Privacy Policy, including <span>Cookie Use</span>.
            </div>
            <div className="login-info__signin">
                <p>Already have an account?</p>
                <span className='login-info__signin--button' onClick={opensignin}>Sign in</span>
            </div>
            <form className="signin__wrapper" onSubmit={(event) => login(event)}>
                <div className="signin__block">
                <FontAwesomeIcon icon="fa-solid fa-xmark" onClick={closesignin} className="xmark"/>
                    <div className="signin__block--wrapper">
                    <div className="signin__twitter">
                        <svg viewBox="0 0 24 24" fill='rgb(214, 217, 219)' aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                    </div>
                    <div className="signin__title">
                        <p>Sign in to Twitter</p>
                        <div className="error__block1">
                            <p>Wrong Email or Password</p>
                        </div>
                    </div>
                    <div className="signin__buttons">
                        <div className="signin__button login-info__button" onClick={signInWithGoogle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-3 0 262 262"  preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                            <p>Sign in with Google</p>
                        </div>
                    </div>
                    <div className="signin__or">
                        <span></span>
                        <p>or</p>
                        <span></span>
                    </div>
                    <div className="signin__input--wrapper">
                        <input type="email" className='signin__input' placeholder='Email' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                        <input type="password" className='signin__input' placeholder='Password' onChange={(event) => {setLoginPassword(event.target.value)}}/>
                    </div>
                    <div className="signin__next login-info__button">
                        <button>Sign in</button>
                    </div>
                    </div>
                </div>
            </form>
            <div className="signup__wrapper">
            <form className="signin__block" onSubmit={(event) => register(event)}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" onClick={closesignup} className="xmark"/>
                    <div className="signin__block--wrapper">
                    <div className="signin__twitter">
                        <svg viewBox="0 0 24 24" fill='rgb(214, 217, 219)' aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                    </div>
                    <div className="signin__title signup__title">
                        <p>Sign up to Twitter</p>
                        <div className="error__block2">
                        <p className='txt'>Password should be at least 6 characters</p>
                        </div>
                    </div>
                    <div className="signin__input--wrapper">
                        <input type="text" className='signin__input' required placeholder='Username' onChange={(event) => {setRegisterUsername(event.target.value)}}/>
                        <input type="email" className='signin__input' required placeholder='Email'  onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                        <input type="password" className='signin__input' required placeholder='Password' onChange={(event) => {setRegisterPassword(event.target.value)}} />
                    </div>
                    <div className="signin__next login-info__button">
                        <button>Sign up</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Logininfo;
