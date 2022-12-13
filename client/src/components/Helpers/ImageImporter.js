import React from 'react';
import { useNavigate } from "react-router-dom";


const styles = (props) => ({
  width: props.scale? '100%': props.width,
  height: props.scale? '100%': !props.width && (props.height || 24),
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  maxHeight: props.maxHeight
})

const ImageImporter = (props) => {

  const navigate = useNavigate();
  

  
  const redirect = () => props.redirectLink && navigate(props.redirectLink);
  const amurseSrc = () => "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  const src = props.source ? props.source : amurseSrc();



  return (
    <div onClick={redirect} className={props.enableHover && 'hover'}>
      <img alt="" src={src} style={styles(props)}></img>
    </div>
  )
}

export default ImageImporter