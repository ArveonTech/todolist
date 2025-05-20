import { Link } from "react-router-dom";

export default function TodoCardCon(props) {
  const { children } = props;

  return (
    <div className="max-w-7xl mx-auto">
      {children}
      <Link to="/">
        <button className="block my-10 mx-auto bg-emerald-400 p-2 rounded-xl cursor-pointer hover:bg-emerald-600 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-500">Kembali</button>
      </Link>
    </div>
  );
}
