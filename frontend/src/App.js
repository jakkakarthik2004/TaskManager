import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const { register, handleSubmit } = useForm();

  const [tasks, setTasks] = useState([]);

  async function formSubmit(data) {
    await axios.post("http://localhost:5000/addTasks", data);
    fetchTasks(); // refresh table after adding
  }

  async function fetchTasks() {
    const res = await axios.get("http://localhost:5000/getTasks");
    setTasks(res.data);
  }
  

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit(formSubmit)} className="mb-6 space-x-3">
        <input
          type="text"
          placeholder="Enter task name"
          {...register("taskname", { required: true })}
          className="border p-2"
        />

        <input
          type="date"
          {...register("taskdate", { required: true })}
          className="border p-2"
        />

        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Submit
        </button>
      </form>

      {/* TABLE */}
      <h2 className="text-xl font-bold mb-2">Added Tasks</h2>

      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Task Name</th>
            <th className="border border-gray-400 p-2">Task Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t._id} className="text-center">
              <td className="border border-gray-400 p-2">{t.taskname}</td>
              <td className="border border-gray-400 p-2">{t.taskdate}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
