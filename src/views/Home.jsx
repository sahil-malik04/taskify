import React, { useState, useEffect } from "react";
import "../App.css";
import AddUpdateTask from "./pages/manage-tasks/AddUpdateTask";
import TaskList from "./pages/manage-tasks/TaskList";
import Filters from "./pages/manage-tasks/Filters";

const Home = () => {
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  useEffect(() => {
    if (filter === "Completed") {
      const completed = allTasks.filter(
        (item) => item.priority === "Completed"
      );
      setFilteredTasks(completed);
    } else if (filter === "Incomplete") {
      const incompleted = allTasks.filter(
        (item) => item.priority !== "Completed"
      );
      setFilteredTasks(incompleted);
    } else if (filter === "All") {
      setFilteredTasks(allTasks);
    }
  }, [filter, allTasks]);

  useEffect(() => {
    let sortedTasks = [...allTasks];

    if (sortOption === "date") {
      sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3, Completed: 4 };
      sortedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    setFilteredTasks(sortedTasks);
  }, [sortOption, allTasks]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      setAllTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    } else {
      setAllTasks([
        ...allTasks,
        { ...task, id: Date.now(), createdDate: new Date().toISOString() },
      ]);
    }
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleMarkComplete = (taskId) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: "Completed" } : task
      )
    );
  };

  return (
    <div className="home-container">
      <section className="banner">
        <div className="banner-content">
          <h1 className="banner-title">Welcome to Taskify</h1>
          <p className="banner-subtitle">
            Organize your tasks, prioritize your goals, and stay productive
            every day!
          </p>
        </div>
      </section>

      <header className="header">
        <h1>Taskify</h1>
        <button className="add-task-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </header>

      <Filters
        sortOption={sortOption}
        setSortOption={setSortOption}
        filter={filter}
        setFilter={setFilter}
      />

      <main className="task-list">
        <TaskList
          tasks={filteredTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleMarkComplete={handleMarkComplete}
        />
      </main>

      {showModal && (
        <AddUpdateTask
          task={currentTask}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Home;
