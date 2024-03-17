import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/Auth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import storage from "../storage";

const Home = () => {
  const { signOut } = useAuth();
  const id = localStorage.getItem("_id");
  const accessToken = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingimg, setIsLoadingimg] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleLoad = (name) => {
    setIsLoadingimg(true);
    getDownloadURL(ref(storage, `${id}/${name}`))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        const img = document.getElementById("myimg");
        img.setAttribute("src", url);
        setIsLoadingimg(false);
      })
      .catch((error) => {});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textValue) {
      const storageRef = ref(storage, `${id}/${textValue}`);
      setIsLoading(true);

      fetch("http://localhost:4000/api/user/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ fileName: textValue, userName: id }),
      }).then((res) => {
        if (res.ok)
          uploadBytes(storageRef, file).then((snapshot) => {
            alert("File uploaded");
            const listRef = ref(storage, `${id}`);
            listAll(listRef)
              .then((res) => {
                setFiles(res.items);
              })
              .catch((error) => {});
            setIsLoading(false);
          });
        else {
          setIsLoading(false);
        }
      });
    } else {
      alert("Empty file name");
    }
  };

  useEffect(() => {
    const listRef = ref(storage, `${id}`);
    listAll(listRef)
      .then((res) => {
        setFiles(res.items);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button className="nav-link active btn" aria-current="page" href="#">
            Home
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn" href="#">
            Sign up
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn" href="#" onClick={signOut}>
            Logout
          </button>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table className="table" style={{ width: "30vw" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File Name</th>
              <th scope="col">File Preview</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleLoad(item.name)}
                    disabled={isLoadingimg}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <img id="myimg" width={200} height={200} />
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "10vw" }}>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose a file to upload:
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Enter file name:
          </label>
          <input
            type="text"
            className="form-control"
            id="textInput"
            value={textValue}
            onChange={handleTextChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
