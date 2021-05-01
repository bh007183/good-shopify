import React, {useEffect} from 'react'
import "./style.css"
import Grid from "@material-ui/core/Grid"
import {useSelector, useDispatch} from "react-redux"
import {getPublic} from "../store/imageSlice"
import {deleteImage} from "../store/imageSlice"
import {Link} from "react-router-dom"
import {getEditImage} from "../store/imageSlice"


export default function Main() {
  

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPublic())
        
    }, [])
    
    const publicImages = useSelector(state => state.store.Image.publicImage )
    


    const handleDelete = async event => {
        await dispatch(deleteImage(event.target.value))
        await dispatch(getPublic())
    }

    const editImage = async event => {
        
        dispatch(getEditImage(event.target.value))
    }
  

    return (
        <Grid container spacing={2} direction="row">
            {publicImages.length >= 1 ? (publicImages.map((image, index) => 
            <Grid  key={index} item xs={6} sm={4} md={3} >
                <div  className="imgContainer">
                    
                    <img className="image" src={image.url} alt={image.title}/>
                    
                </div>
            </Grid>)) : <></> }
 
                
                


        </Grid>
    )
}