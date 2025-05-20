export default function SearchInputCard({ onUpdate }) {
  const handleSearch = (e) => {
    onUpdate(e.target.value);
  };

  return (
    <div className="max-w-xs mx-auto mt-10 flex flex-col ">
      <label htmlFor="searchTodo">Cari To-do-List : </label>
      <input type="text" id="searchTodo" className="border-2 p-1 rounded-lg" placeholder="masukkan judul" onChange={handleSearch} />
    </div>
  );
}
