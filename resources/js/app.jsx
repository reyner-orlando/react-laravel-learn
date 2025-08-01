import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function App() {
    return (
      <div>
      {[0].map((i) => ( 
        <div key={i}>  
        <motion.div
          
          className="container my-3"
          initial={{ opacity: 0, y: 50 }} // dari bawah dan transparan
          animate={{ opacity: 1, y: 0 }} // fade in dan naik ke posisi normal
          transition={{ duration: 1,
          delay: i * 0.5,
          }}
    >

    <div className="row">
      <div className="col">
        <div className="p-4 bg-primary text-white text-center rounded">
          Konten 1 Kolom (Responsive)
        </div>
      </div>
    </div>
    </motion.div>
    
        <motion.div      
      className="container my-3"
      initial={{ opacity: 0, y: 50 }} // dari bawah dan transparan
      animate={{ opacity: 1, y: 0 }} // fade in dan naik ke posisi normal
      transition={{ duration: 1,
        delay: i * 0.5 +0.25 ,// ⏳ delay bertahap per item
       }}
    >
  <FormInput />
  </motion.div> 
  </div>
      ))}    
  </div>     
      );
}

function FormInput() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    try{
      const response = await fetch('/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({title}),
    });

    if(response.ok){
      setMessage('Berhasil disimpan!');
    }else{
      setMessage('Gagal menyimpan.');
    }
    } catch (error){
      setMessage('Terjadi error.');
    }finally{
      setLoading(false);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Judul Tugas:</label>
        <input
        type="text"
        id="title"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)} //BELOM
      />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Deskripsi:</label>
        <input
        type="text"
        id="desc"
        className="form-control"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      </div>

       <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim'}
      </button>

      {message && (
        <div className="mt-3 alert alert-info" role="alert">
          {message}
        </div>
      )}
    </form>
  );
}
export default FormInput;
const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}



