import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function App() {
    return (
        <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 50 }} // dari bawah dan transparan
      animate={{ opacity: 1, y: 0 }} // fade in dan naik ke posisi normal
      transition={{ duration: 1
       }}
    >

    <div className="row">
      <div className="col">
        <div className="p-4 bg-primary text-white text-center rounded">
          Konten 1 Kolom (Responsive)
        </div>
      </div>
    </div>
  <FormInput />
  </motion.div>
    );
}

function FormInput() {
  const [nama, setNama] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    try{
      const response = await fetch('/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({nama}),
    });

    if(response.ok){
      alert("Berhasil Disimpan");
    }else{
      alert("Gagal Disimpan");
    }
    } catch (error){
      console.error("Error:", error);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlfor="Nama" className="form-label">Nama:</label>
        <input
        type="text"
        id="nama"
        className="form-control"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      </div>
      <button type="submit" className="btn btn-primary">Kirim</button>
    </form>
  );
}
export default FormInput;
const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}



