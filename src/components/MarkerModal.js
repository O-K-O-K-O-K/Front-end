import React, {useState} from 'react'
import styled from 'styled-components'
import { TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import {useDispatch} from "react-redux"
import {actionCreators as markerActions} from "../redux/modules/marker"
const MarkerModal = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const selectTitle = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
    }
    const addMarker= () => {
        let marker = {
            latitude : props.latitude,
            longitude : props.longitude,
            placename: props.placename,
            locationCategory: props.locationCategory,
        }
        dispatch(markerActions.addMarkerAX(marker))
        props.close()
    }
    console.log(props.latitude,props.longitude,props.placename)
    return (
        
            <React.Fragment>
                 <Component onClick={props.close} />
                  <ModalComponent> 
                      <ModalExitBtn onClick={props.close} >
                           <Close/>
                            </ModalExitBtn> 
                            <ModalHeader>산책로로 설정하겠습니까?</ModalHeader> 
                            <ModalInput> 
                               {props.placename}
                                </ModalInput> 
                                <ModalButtonContainer> 
                                    <ModalSubmitBtn onClick={addMarker}> 산책로 등록 </ModalSubmitBtn> 
                                    </ModalButtonContainer>
                                     </ModalComponent> 
                                     </React.Fragment>

        
    )
}
const Component = styled.div` 
position: fixed; 
top: 0; 
opacity: 0.4;
height: 100vh; 
width: 390px;
background-color: 
black; z-index: 10; `
const ModalComponent = styled.div` 
position: fixed; 
top: 50%; 
left: 50%; 
width: 390px; 
height: 300px; 
transform: translate(-50%, -50%);
 background-color: white; 
 z-index: 20; 
 display: flex; 
 flex-direction: column; 
 justify-content: space-between;
  align-items: center; `
 const ModalHeader = styled.div` 
 margin-top: 30px; 
 font-weight: 600; 
 font-size: 18px; ` 
 const ModalInput = styled.div` 
 box-sizing: border-box;
  width: 50%; ` 
  const ModalButtonContainer = styled.div` 
  box-sizing: border-box; 
  width: 50%; 
  margin-bottom: 30px; ` 
  const ModalSubmitBtn = styled.button` 
  width: 100%; 
  background-color: #FFE812; 
  border: none; 
  outline: none; 
  padding: 10px 0; 
  cursor: pointer; 
  font-weight: 600; 
  font-size: 15px; 
  border-radius: 4px; 
  &:hover { opacity: 0.7; } ` 
  const ModalExitBtn = styled.button` 
  position: absolute; 
  top: 0; 
  right: 0;
  padding: 8px 12px;
  cursor: pointer; 
  background-color: transparent; 
  outline: none;
  border: none; 
  color: black; `



export default MarkerModal