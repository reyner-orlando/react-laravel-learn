import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function App() {
    return (
        <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 50 }} // dari bawah dan transparan
      animate={{ opacity: 1, y: 0 }} // fade in dan naik ke posisi normal
      transition={{ duration: 1 }}
    >

    <div className="row">
      <div className="col">
        <div className="p-4 bg-primary text-white text-center rounded">
          Konten 1 Kolom (Responsive)
        </div>
      </div>
    </div>
    <TabelSatuKolom />
  </motion.div>
    );
}

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
const root2 = document.getElementById('app2');
if (root2) {
  ReactDOM.createRoot(root2).render(<Counter />);
}
const TabelSatuKolom = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th>Judul Kolom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Isi Baris 1</td>
                </tr>
                <tr>
                  <td>Isi Baris 2</td>
                </tr>
                <tr>
                  <td>Isi Baris 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TabelSatuKolom;

import { useState } from 'react';

function Counter() {
  const [angka, setAngka] = useState(0); // angka = state, setAngka = cara ubah

  return (
    <div>
      <p>Nilai: {angka}</p>
      <button onClick={() => setAngka(angka + 1)}>Tambah</button>
    </div>
  );
}
export default Counter;
