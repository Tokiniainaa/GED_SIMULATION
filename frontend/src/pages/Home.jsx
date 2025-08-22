import { useState, useEffect } from "react";
import api from "../api";
import Document from "../components/Document";

function Home() {
  const [documents, setDocuments] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = () => {
    api
      .get("/api/documents/")
      .then((res) => setDocuments(res.data))
      .catch((err) => alert(err));
  };

  const deleteDocument = (id) => {
    api
      .delete(`/api/documents/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Document deleted!");
        getDocuments();
      })
      .catch((error) => alert(error));
  };

  const createDocument = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    api
      .post("/api/documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 201) alert("Document created!");
        else alert("Failed to create document.");
        setTitle("");
        setContent("");
        setFile(null);
        getDocuments();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Documents</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {documents.map((document) => (
          <Document
            document={document}
            onDelete={deleteDocument}
            key={document.id}
          />
        ))}
      </div>

      <div className="max-w-lg mx-auto bg-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Upload a Document
        </h2>
        <form onSubmit={createDocument} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Content</label>
            <textarea
              className="textarea textarea-bordered w-full"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="label">File</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
