import React, { useEffect } from 'react'
import styled from "styled-components";
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/User/userSlice';

const Header = (props) => {

   const dispatch=useDispatch();
   const navigate= useNavigate()
   const userName=useSelector(selectUserName)
   const userPhoto=useSelector(selectUserPhoto)

   useEffect(()=>{
       auth.onAuthStateChanged(async(user)=>{
           if(user){
               setUser(user)
               navigate('/home')
           }
       })
   },[userName])


  const handleAuth=()=>{
      signInWithPopup(auth,provider)
      .then(result=>{
          console.log(result.user)
          setUser(result.user)

      }).catch((e)=>{
          alert(e.message)
      })
  }

  const handleSignOut=()=>{
      signOut(auth)
      .then(()=>{
          dispatch(setSignOutState())
          navigate('/')
      })
      .catch((e)=>{
        alert(e.message)
      })
  }

  const setUser=(user)=>{
    dispatch(
        setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        })
    )
  }

  const name1=useSelector(selectUserName)
  
  return (
    <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="Disney" />
        </Logo>
        {!userName ? (
           <Login onClick={handleAuth}>Login</Login> 
        ):(
        <>
            <NavMenu>
                <a href='/home'>
                    <img src="/images/home-icon.svg" alt="Home" />
                    <span>HOME</span>
                </a>
                
                <a href='/home'>
                    <img src="/images/search-icon.svg" alt="Home" />
                    <span>SEARCH</span>
                </a>

                <a href='/home'>
                    <img src="/images/watchlist-icon.svg" alt="Home" />
                    <span>WATCHLIST</span>
                </a>

                <a href='/home'>
                    <img src="/images/original-icon.svg" alt="Home" />
                    <span>ORIGINALS</span>
                </a>

                <a href='/home'>
                    <img src="/images/movie-icon.svg" alt="Home" />
                    <span>MOVIES</span>
                </a>

                <a href='/home'>
                    <img src="/images/series-icon.svg" alt="Home" />
                    <span>SERIES</span>
                </a>

            </NavMenu>
            <SignOut>
                <UserImg src={userPhoto} alt={userName} />
                <DropDown>
                    <span onClick={handleSignOut}>Sign Out</span>
                </DropDown>
            </SignOut>
            
        </>
        )}    
    </Nav>
  )
}

const Nav=styled.nav`
    position: fixed;
    top: 0;
    left:0;
    right:0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`

const Logo=styled.a`
    padding: 0;
    width: 90px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    img{
        display: block;
        width: 100%
    }
`

const NavMenu=styled.div`
    align-items:center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;


    a{
        display: flex;
        align-items: center;
        padding: 0 12px;

        img{
            height: 25px;
            min-height: 25px;
            width: 25px;
            z-index: auto;
        }

        span{
            color: rgb(249,249,249);
            font-size: 16px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            margin-top:3px;
            margin-left: 2px;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
            }
        }

        &:hover {
            span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
            }
        }


    }

    @media (max-width: 768px){
        display: none;
    }

`;

const Login=styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    font-weight: bold;

    &:hover{
        background-color: white;
        color: black;
        border-color: transparent;
        cursor: pointer;
        
    }
`

const UserImg=styled.img`
    border-radius: 50%;
    height: 100%;
    margin-left: 8px;
    width:100%;
`;


const DropDown=styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background-color: rgb(19,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    padding: 10px;
    border-radius: 4px;
    box-shadow: rgb(0 0 0/50%) 0px 0px 18px;
    font-size: 13px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
    
`;

const SignOut=styled.div`
    position: relative;
    height: 58px;
    width: 62px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items:center;
    justify-content: center;

    &:hover{
        ${DropDown}{
            opacity:1;
            transition-duration: 1s;
        }
    }
    
`;

export default Header