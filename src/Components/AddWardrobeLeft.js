import React, {useReducer, useState} from 'react'
import { useDispatch } from 'react-redux'
import { createwardrobe,getClasification } from '../Pages/WardrobeSlice'
import FileBase from "react-file-base64";
import {Form} from "react-bootstrap";
import axios, { post } from 'axios';
import useApi from "../Hooks/useApi";


function AddWardrobeLeft() {

    const token = sessionStorage.getItem("user");
    console.log(token)
    const dispatch = useDispatch();
    const [dress, setdress] = useState({image :"" , description:"",user_id:token,size:"M",type:"Shirt"})
    const [img, setImg] = useState("")
    const [url, setUrl] = useState("")
    const [type, setType] = useState("")

    const submit= ()=> {
        if(  (dress.description==="") || (dress.size==="") || (dress.type==="") ){
            alert("invalid Form!");
            setTheImageToURL()
        }
        else{
            dispatch(createwardrobe(dress));
            console.log(dress);
            alert("added !");
            window.location.reload();
        }

    };

    const setTheImageToURL = async() => {
        const data = new FormData();

        data.append('file', img);
        data.append('upload_preset', 'px7nwj8x');
        data.append('api_key', 844693761588111);
        data.append('cloud_name', 'skander');

        await fetch('https://api.cloudinary.com/v1_1/skander/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.url);
                setdress({ ...dress, image: data.url });
                setImg(data.url.toString())
            })
            .catch(err => {
                console.log(err);
            });


    };


    const fileUpload = (file)=>{
        const url = 'http://51.38.224.143:8000/api/predict/';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config).then((rep)=>{console.log(getType(rep.data[0]));
            setdress({ ...dress, type: getType(rep.data[0]) });
            setType(getType(rep.data[0]));
        })
    }


    const getType= (type)=>{
        switch(type){
            case 0:
                return "T-Shirt"
            case 1:
                return "Trouser"
            case 2:
                return "Pullover"
            case 3:
                return "Dress"
            case 4:
                return "Coat"
            case 5:
                return "Sandal"
            case 6:
                return "Shirt"
            case 7:
                return "Sneaker"
            case 8:
                return "Bage"
            default:
                return "Boot"
        }
    }

    const fileSize= (file)=>{

        const url = 'http://51.38.224.143:9001/apisize';
        const formData = new FormData();
        formData.append('file1',file);
        formData.append('file2',file);
        formData.append('file3',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log("tesst")
        post(url, formData,config).then((rep)=>console.log(rep.size))
    }

    return (
        <div>

            <div className="form">
                <input type="text" className="form-control" placeholder="description" onChange={(e) =>
                    setdress({ ...dress, description: e.target.value })
                }
                />
                <img src={img} />
                <div>Type : {type}</div>
                <Form.File
                    type="file"
                    multiple={false}
                    //onDone={({ base64 }) =>{setdress({ ...dress, image: base64 });setImg(base64);clasification({ ...img, image: base64 });}}

                    onChange={(e) => {fileUpload(e.target.files[0]);setImg(e.target.files[0]);fileSize(e.target.files[0]);setTheImageToURL(); }}

                />

                <button onClick={submit} className="btn"> submit </button>
            </div>

        </div>
    )
}

export default AddWardrobeLeft
