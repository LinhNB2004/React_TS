import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface ITodo {
  id?: number | string;
  title: string;
  complete: boolean;
}

function App() {
  const [todos, setTodo] = useState<ITodo[]>([]);
  const [newtodo, setNewtodo] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Load dữ liệu ra
  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodo(data);
      });
  }, []);

  // Thêm mới
  const handleClickAdd = () => {
    const data: ITodo = {
      title: newtodo,
      complete: true,
    };
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data: ITodo) => {
        setTodo([...todos, data]);
        setNewtodo(""); // Đặt lại giá trị của newtodo thành chuỗi rỗng
        alert("Thêm mới thành công");
      });
  };

  // Lấy giá trị của ô input thêm mới
  const Set_new_todo = (value: any) => {
    setNewtodo(value);
  };

  // Lấy giá trị của ô input khi chỉnh sửa
  const Set_edit_title = (value: any) => {
    setEditTitle(value);
  };

  // Xóa
  const onDelete = (id: any) => {
    if (confirm("Are you sure you want to delete")) {
      fetch("http://localhost:3000/todo/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data: ITodo) => {
          const newtodos = todos.filter((todo) => todo.id !== id);
          setTodo(newtodos);
          alert("Xóa thành công");
        });
    }
  };

  // Bắt đầu chỉnh sửa
  const changeStatus = (id: any) => {
    setEditTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTitle(todoToEdit.title);
    }
  };

  // Cập nhật
  const updateTodo = (id: any) => {
    const todoToUpdate = todos.find((todo) => todo.id == id);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, title: editTitle, complete: true };
      fetch(`http://localhost:3000/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data: ITodo) => {
          const newtodos = todos.map((todo) => (todo.id === id ? data : todo));
          setTodo(newtodos);
          setEditTitle(""); // Đặt lại giá trị của editTitle thành chuỗi rỗng
          setEditTodoId(null); // Kết thúc chỉnh sửa
          alert("Cập nhật thành công");
        });
    }
  };

  return (
    <>
      <div className="box">
        <div className="box1">
          <h2>Ahihi</h2>
          <div className="nd">
            <input
              type="text"
              value={newtodo}
              onChange={(e) => Set_new_todo(e.target.value)}
            />
            <button className="them" onClick={handleClickAdd}>
              Thêm danh sách
            </button>

            {/* Hiển thị danh sách Todo */}

            <ul>
              {todos.map((todo: ITodo) =>
                todo.complete && editTodoId !== todo.id ? (
                  <li key={todo.id} className="dl">
                    {todo.title}
                    <button
                      className="bt"
                      onClick={() => changeStatus(todo.id)}
                    >
                      Sửa
                    </button>
                    <button className="bt" onClick={() => onDelete(todo.id)}>
                      Xóa
                    </button>
                  </li>
                ) : (
                  <li key={todo.id}>
                    <input
                      className="edit"
                      type="text"
                      value={todo.id === editTodoId ? editTitle : todo.title}
                      onChange={(e) => {
                        if (todo.id === editTodoId) {
                          Set_edit_title(e.target.value);
                        }
                      }}
                    />
                    {todo.id === editTodoId ? (
                      <>
                        <button
                          className="bt"
                          onClick={() => updateTodo(todo.id)}
                        >
                          Lưu
                        </button>
                        <button
                          className="bt"
                          onClick={() => setEditTodoId(null)}
                        >
                          Hủy
                        </button>
                      </>
                    ) : null}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
