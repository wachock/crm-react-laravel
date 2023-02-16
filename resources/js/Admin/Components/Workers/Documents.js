import React,{useState} from 'react'


export default function Documents() {

    const [uploadedFiles, setUploadedFiles] = useState([])
     const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    
    console.log(uploadedFiles);

    const handleFileEvent =  (e) => {
        const imagesArray = [];
         for (let i = 0; i < e.target.files.length; i++) {      
              imagesArray.push(e.target.files[i]);
         }
         setUploadedFiles(imagesArray);
         handleSubmit();
    }
     const handleSubmit = () => {
        const formData = new FormData();
        for (let i = 0; i < uploadedFiles.length; i++) {
          formData.append("images[]", uploadedFiles[i]);
        }
        console.log(formData);       
        axios
            .post(`/api/admin/general-settings`, formData, { headers })
            .then((response) => {
               
            });
    };
   
  return (
    <div className="App">

            <input id='fileUpload' type='file' multiple
                    accept='application/pdf, image/png'
                    onChange={handleFileEvent}
            />

            <label htmlFor='fileUpload'>
                <a  className={`btn btn-primary`}>Upload Files</a>
            </label>

            <div className="uploaded-files-list">
                {uploadedFiles.map(file => (
                    <div key={file.name}>
                        {file.name}
                    </div>
                ))}
            </div>

        </div>
  )
}
