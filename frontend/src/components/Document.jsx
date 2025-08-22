import React from "react";
import "../styles/Document.css";

function Document({ document, onDelete }) {
  const formattedDate = new Date(document.created_at).toLocaleDateString(
    "en-US"
  );

  // Fonction pour détecter le type de fichier
  const getFileType = (fileUrl) => {
    if (!fileUrl) return null;
    const extension = fileUrl.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif"].includes(extension)) return "image";
    if (extension === "pdf") return "pdf";
    return "other";
  };

  const fileType = getFileType(document.file);

  return (
    <div className="document-container">
      <p className="document-title">{document.title}</p>
      <p className="document-content">{document.content}</p>
      <p className="document-date">{formattedDate}</p>

      {document.file && (
        <div className="document-file-preview">
          {fileType === "image" && (
            <img
              src={document.file}
              alt={document.title}
              style={{ maxWidth: "200px" }}
            />
          )}
          {fileType === "pdf" && (
            <iframe
              src={document.file}
              title={document.title}
              width="300"
              height="400"
            ></iframe>
          )}
          {fileType === "other" && (
            <p>
              File:{" "}
              <a href={document.file} target="_blank" rel="noopener noreferrer">
                {document.file.split("/").pop()}
              </a>
            </p>
          )}
        </div>
      )}

      <button className="delete-button" onClick={() => onDelete(document.id)}>
        Delete
      </button>
    </div>
  );
}

export default Document;
