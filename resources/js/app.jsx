import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function App() {

  const[data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  
  const fetchData = () => {
    setLoadingData(true); 
    fetch('/data') 
      .then((res) => res.json())
      .then((json) => setData([...json]))
      .catch((err) => console.error('Gagal ambil data:', err))
      .finally(() => setLoadingData(false));
  };

  useEffect(() => {
    fetchData();
  }, [])
  
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
  <FormInput afterSubmit={fetchData} />
  </motion.div> 
  {loadingData ? (
  <p className="text-muted">Memuat data tugas...</p>
) : (
  <TampilkanData data={data} />
)}
  </div>
      ))}    
  </div>     
      );
}
function TampilkanData({ data }){
return(
  <div className="container mt-4">
      <h2>Daftar Tugas</h2>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.nama}</strong> - {item.deskripsi} <br />
            Deadline: {item.waktu_tenggat}
          </li>
        ))}
      </ul>
    </div>
);
}

function FormInput({ afterSubmit }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [waktutenggat, setWaktuTenggat] = useState('');
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
        body: JSON.stringify({nama: title, deskripsi: desc, waktu_tenggat: waktutenggat}),
    });

    if(response.ok){
      setMessage('Berhasil disimpan!');
      setTitle('');
        setDesc('');
        setWaktuTenggat('');
        afterSubmit(); // ⬅️ Fetch data terbaru setelah kirim form
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
      <div className="mb-3">
        <label htmlFor="waktutenggat" className="form-label">Waktu Tenggat:</label>
        <input
        type="datetime-local"
        id="waktutenggat"
        name="waktutenggat"
        className="form-control"
        value={waktutenggat}
        onChange={(e) => setWaktuTenggat(e.target.value)}
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

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}




