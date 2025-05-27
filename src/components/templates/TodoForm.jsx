import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TodoForm() {
  const [judul, setJudul] = useState("");
  const [catatan, setCatatan] = useState("");

  const successNotify = () => {
    toast.success("Data berhasil dikirim", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const errorNotify = (error) =>
    toast.info(`${error}`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/todos",
        {
          judul,
          catatan,
          done: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token_kamu",
          },
        }
      );

      setJudul("");
      setCatatan("");
      successNotify();
    } catch (error) {
      if (error.response) {
        errorNotify("Terjadi kesalahan pada server");
      } else if (error.request) {
        errorNotify("Error: Server tidak merespons.");
      } else {
        errorNotify("Data Gagal dikirim");
      }
    }
  }

  return (
    <div>
      <div className="w-80 flex justify-center border flex-col p-7 border-cyan-700 rounded-2xl">
        <h1 className="text-center text-2xl pb-3 font-semibold border-b">Form To-Do-Lists</h1>
        <form onSubmit={handleSubmit} className="flex flex-col pt-10">
          <label htmlFor="judul" className="pb-2">
            Judul :
          </label>
          <input
            type="text"
            name="judul"
            id="judul"
            className="border p-2 rounded-xl focus:outline-none focus:border-cyan-500 focus:border-2"
            placeholder="Masukkan judul catatan"
            required
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
          <label htmlFor="catatan" className="pb-2 mt-5">
            Catatan :
          </label>
          <input
            type="text"
            name="catatan"
            id="catatan"
            className="border p-2 rounded-xl focus:outline-none focus:border-cyan-500 focus:border-2"
            placeholder="Masukkan catatan"
            required
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
          <button type="submit" className="mt-7 p-2 rounded-3xl bg-cyan-300 hover:bg-cyan-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500 cursor-pointer">
            Submit
          </button>
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
      <h2 className="text-center h-10 font-semibold text-2xl">Created By : Arveon</h2>;
      <ToastContainer position="top-left" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
    </div>
  );
}
