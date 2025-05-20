import { useState, useEffect } from "react";

export default function TodoCard({ judul }) {
  const [cardEdit, setCardEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [judulEdit, setJudulEdit] = useState("");
  const [catatanEdit, setCatatanEdit] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(judul);
  },[judul]);

  function handleSearch(judul) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.judul.toLowerCase().includes(judul.toLowerCase())));
  }

  function handleDelate(id) {
    fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal hapus data");
        return res.json();
      })
      .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
      .catch((err) => console.error(err));
  }

  function handleEdit(id, judul, catatan) {
    setCardEdit(true);
    setEditingId(id);
    setJudulEdit(judul);
    setCatatanEdit(catatan);
  }

  function handleSubmit(id, judul, catatan) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        judul,
        catatan,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal edit data");
        return res.json();
      })
      .then((updatedTodo) => {
        // Update todos dengan todo yang telah diperbarui
        setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      })
      .catch((err) => console.error(err));

    setJudulEdit("");
    setCatatanEdit("");
    setCardEdit(false);
  }

  function handleDone(id, done) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: !done,
      }),
    });
  }

  return (
    <>
      <div className="w-full flex gap-10 flex-wrap justify-center mt-20">
        {todos.map((d) => (
          <div key={d.id} className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 mx-auto my-4">
            {cardEdit && editingId === d.id ? (
              <form className="flex flex-col pt-10 bg-white p-6">
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
                  value={judulEdit}
                  onChange={(e) => setJudulEdit(e.target.value)}
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
                  value={catatanEdit}
                  onChange={(e) => setCatatanEdit(e.target.value)}
                />
                <button className="mt-7 p-2 rounded-3xl bg-cyan-300 hover:bg-cyan-600 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500 cursor-pointer" onClick={() => handleSubmit(d.id, judulEdit, catatanEdit)}>
                  Submit
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-lg bg-gray-800 border-gray-700 dark:hover:bg-gray-700 ">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{d.judul}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{d.catatan}</p>
                <div id="menu" className="flex justify-around mt-5">
                  <button
                    className="w-20 bg-blue-700 text-white p-2 rounded-xl cursor-pointer"
                    onClick={() => {
                      handleEdit(d.id, d.judul, d.catatan);
                    }}
                  >
                    Edit
                  </button>
                  <button className="w-20 bg-green-700 text-white p-2 rounded-xl cursor-pointer" onClick={(e) => handleDone(d.id, d.done)}>
                    {d.done ? "belum" : "Selesai"}
                  </button>
                  <button className="w-20 bg-red-700 text-white p-2 rounded-xl cursor-pointer" onClick={() => handleDelate(d.id)}>
                    Hapus
                  </button>
                </div>
                <h1 className="mt-7 text-white">Status : {d.done ? "Selesai" : "Belum"}</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
