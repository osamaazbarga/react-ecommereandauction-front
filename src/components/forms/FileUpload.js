import React,{useState} from 'react'
import resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar,Badge } from 'antd';
import {LoadingOutlined} from '@ant-design/icons'


const FileUpload = ({ values, setValues }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [loading,setLoading]=useState(false)

    const FileUploadAndResize = (e) => {
        //console.log(e.target.files);
        //resize
        let files = e.target.files
        let allUploadedFiles = values.images;
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                // file, // Is the file of the image which will resized.
                // maxWidth, // Is the maxWidth of the resized new image.
                // maxHeight, // Is the maxHeight of the resized new image.
                // compressFormat, // Is the compressFormat of the resized new image.
                // quality, // Is the quality of the resized new image.
                // rotation, // Is the degree of clockwise rotation to apply to uploaded image.
                // responseUriFunc, // Is the callBack function of the resized new image URI.
                // outputType, // Is the output type of the resized new image.
                // minWidth, // Is the minWidth of the resized new image.
                // minHeight // Is the minHeight of the resized new image.
                resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0,
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: user ? user.token : ""
                            }
                        }
                        )
                        .then(res=>{
                            console.log("image upload res data",res);
                            setLoading(false)
                            allUploadedFiles.push(res.data)
                            setValues({...values,images:allUploadedFiles})
                        })
                        .catch(err=>{
                            setLoading(false)
                            console.log('cloudinary upload err',err);
                        })
                    },
                    'base64'
                )
            }
        }
        //send back to server to upload cloudinary
        //set url to images[] in the parent component - productCreate
    }

    const handleImageRemove=(public_id)=>{
        setLoading(true)
        console.log('remove image',public_id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
            headers:{
                authtoken:user?user.token:"",
            }
        }).then((res)=>{
            setLoading(false)
            const{images}=values
            let filteredImages=images.filter((item)=>{
                return item.public_id!=public_id
            })
            setValues({...values,images:filteredImages})
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false)

        })

    }

    return (
        <div>
            <div className="row">
            <label className="btn btn-primary btn-raised mt-3">
                Choose File
                
                <input
                    type="file"
                    multiple
                    hidden
                    accept="images/*"
                    onChange={FileUploadAndResize} 
                    
                    />
            </label>
        </div>
        <div className="row">
        {
            loading?<LoadingOutlined className="text-danger h1"/>:<div></div>
        }
            {values.images&&values.images.map((image)=>(
                
                <Badge 
                    key={image.public_id} 
                    count="X"
                    onClick={()=>handleImageRemove(image.public_id)}
                    style={{cursor:"pointer"}}
                >
                    
                        <Avatar shape="square" src={image.url} size={150} className="ml-3"/>
                    
                    
                </Badge>
            ))}
        </div>
        </div>
    )
}

export default FileUpload
