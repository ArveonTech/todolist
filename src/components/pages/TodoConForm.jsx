export default function TodoList(props) {
  const { children } = props;
  return <div className="w-full max-w-4xl flex justify-center items-center flex-col gap-20 mt-20 px-10 mx-auto">{children}</div>;
}
