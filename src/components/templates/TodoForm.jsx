import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TodoForm() {
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [catatan, setCatatan] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newJudul = e.target.judul.value;
    const newCatatan = e.target.catatan.value;

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        judul: `${newJudul}`,
        catatan: `${newCatatan}`,
        done: false,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Data berhasil ditambahkan");
        navigate("/data");
      })
      .catch((err) => {
        alert("Gagal kirim data: " + err.message);
      });
  }

  return (
    <div>
      <div className="w-96 flex justify-center border flex-col p-7 border-cyan-700 rounded-2xl">
        <h1 className="text-center text-2xl pb-3 font-semibold border-b">Form To-Do-Lists</h1>
        <form action="/data" method="POST" onSubmit={handleSubmit} className="flex flex-col pt-10">
          <label htmlFor="judul" className="pb-2">
            Judul :
          </label>
          <input type="text" name="judul" id="judul" className="border p-2 rounded-xl focus:outline-none focus:border-cyan-500 focus:border-2" placeholder="Masukkan judul catatan" required onChange={(e) => setJudul(e.target.value)} />
          <label htmlFor="catatan" className="pb-2 mt-5">
            Catatan :
          </label>
          <input type="text" name="catatan" id="catatan" className="border p-2 rounded-xl focus:outline-none focus:border-cyan-500 focus:border-2" placeholder="Masukkan catatan" required onChange={(e) => setCatatan(e.target.value)} />
          <button className="mt-7 p-2 rounded-3xl bg-cyan-300 hover:bg-cyan-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500 cursor-pointer">Submit</button>
        </form>
      </div>
      <Link to="/data">
        <button className="block mt-10 mx-auto bg-emerald-400 p-2 rounded-xl cursor-pointer hover:bg-emerald-600 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-500">Lihat data</button>
      </Link>
      <div className="mt-16">
        <h2 className="text-center">Preview : </h2>
        <div className="max-w-md w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto my-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{judul}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{catatan}</p>
        </div>
      </div>
    </div>
  );
}
