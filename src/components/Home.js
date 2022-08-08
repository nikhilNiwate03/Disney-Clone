import styled from 'styled-components'

import React from 'react'
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import db from '../firebase';
import { setMovies } from '../features/User/movie/movieSlice';
import { selectUserName } from '../features/User/userSlice';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { async } from '@firebase/util';


const Home = () => {
    const dispatch=useDispatch();
    const userName=useSelector(selectUserName)
    let recommends=[];
    let newDisney=[];
    let originals=[];
    let trending=[];

    useEffect(()=>{
    
        const q=query(collection(db,'movies'));
        const unsub=onSnapshot(q,(querySnapShot)=>{
            querySnapShot.docs.map((doc)=>{
                switch(doc.data().type){ 
                    case "recommend":
                        recommends=[...recommends,{id:doc.id,...doc.data()}];
                        break;
                    case "new":
                        newDisney=[...newDisney,{id:doc.id,...doc.data()}];
                        break;
                    case "trending":
                        trending=[...trending,{id:doc.id,...doc.data()}];
                        break;
                    case "original":
                        originals=[...originals,{id:doc.id,...doc.data()}];
                        break;
                }
            })

            dispatch(setMovies({
                recommend: recommends,
                newDisney: newDisney,
                original:originals,
                trending:trending,
            }));
        })

        
    },[userName]);



  return (
    <Container>
       <ImgSlider />
       <Viewers />
       <Recommends />
       <NewDisney />
       <Originals />
       <Trending />
    </Container>
  )
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home