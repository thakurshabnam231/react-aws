import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='bucket name';
const REGION ='region';
const ACCESS_KEY ='Access key';
const SECRET_ACCESS_KEY ='secret key';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const Upload= () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile('http://reactjs-shabnam.s3-website.ap-south-1.amazonaws.com', config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/><br/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default Upload;
