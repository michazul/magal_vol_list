// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, "data"), { name, id, file });
    setName("");
    setId("");
    setFile(null);
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleAdd}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.id}</td>
              <td>{row.file && <a href={URL.createObjectURL(row.file)} download>{row.file.name}</a>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
