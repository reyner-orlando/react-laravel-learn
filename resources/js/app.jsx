import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
function App() {

  const[data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  
  const fetchData = () => {
    setLoadingData(true); 
    fetch('/data') 
      .then((res) => res.json())
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

    {/* <div className="row">
      <div className="col">
        <div className="p-4 bg-primary text-white text-center rounded">
          Konten 1 Kolom (Responsive)
        </div>
      </div>
    </div> */}
      {loadingData ? (
  <p className="text-muted">Memuat data tugas...</p>
) : (
  <TampilkanData data={data} />
)}
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

  </div>
      ))}    
  </div>     
      );
}
function TampilkanData({ data }){
  // const [peserta, setPeserta] = useState([]);
  const [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

   const fetchPage = async (page = 1) => {
     if (pages[page]) return; // sudah di-cache
    setLoading(true);
    const res = await fetch(`/peserta?page=${page}`);
    const data = await res.json();
     setPages(prev => ({ ...prev, [page]: data.data }));
    setLastPage(data.last_page);
    setLoading(false);

    // Prefetch halaman berikutnya
    if (page < data.last_page) {
      fetch(`/peserta?page=${page + 1}`)
        .then(res => res.json())
        .then(nextData => {
          setPages(prev => ({ ...prev, [page + 1]: nextData.data }));
        });
    }
  };

  useEffect(()=> {
    fetchPage(1);
  }, []);
return(
  <div className="container mt-4">
      <h2>Daftar Tugas</h2>
      {loading  && !pages[currentPage] ? (<p>Memuat data...</p> ):
      <ul className="list-group">
        {pages[currentPage]?.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.nama}</strong> - {item.deskripsi} <br />
            Deadline: {item.waktu_tenggat}
            <br />
            <button className="btn btn-primary" id={item.id} key={item.id} onClick={()=>handleDone(item.id)}>Done</button>
          </li>  
        ))}
      </ul>
      }
      {/* Pagination */}
      <div className="mt-3">
        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm me-1 ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setCurrentPage(i + 1);
              fetchPage(i + 1);
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
        
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


const handleDone = async (id) => {
  try{
    const response = await fetch('/done', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({id})
    });

    const result = await response.json();
    console.log(result);
  }catch (error){
    console.error('Error: ', error);
  }
};


const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}




