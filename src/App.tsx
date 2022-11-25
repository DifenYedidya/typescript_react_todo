import React from "react";
import Card from "./components/Card";

type ResultProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: Date;
};

const App: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [result, setResult] = React.useState<ResultProps[]>([]);

  React.useEffect(() => {
    const api = async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/posts/?_limit=3",
        {
          method: "GET",
        }
      );
      const jsonData = await data.json();
      console.log(jsonData);
      setResult(jsonData);
    };

    api();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent to redirect to another page
    e.preventDefault();
    // add todos state
    setTodos((prev) => {
      return [
        ...prev,
        { id: Date.now(), title: title, isDone: false, createdAt: new Date() },
      ];
    });

    // clear input
    setTitle("");
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full min-h-screen grid place-content-center">
      <div className="flex flex-col w-80 text-sm gap-4">
        <div>
          {result.map((value) => {
            return (
              //bg not showing? but only slate 400 can
              <div
                key={value.id}
                className="bg-indigo-400 py-2 flex flex-row gap-4"
              >
                <div className="grid place-content-center">{value.id}</div>
                <div>{value.title}</div>
              </div>
            );
          })}
        </div>
        <form
          className="flex bg-white py-2 px-4 gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="flex-1 bg-transparent outline-none"
            placeholder="Add new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-400 py-2 px-4 text-white rounded-sm text-xs cursor-pointer"
          >
            add
          </button>
        </form>
        <ul className="flex flex-col gap-2 h-80 overflow-auto">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Card
                handleToggle={handleToggle}
                handleDelete={handleDelete}
                {...todo}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
