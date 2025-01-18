import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../pages/manage-tasks/TaskList";

jest.mock("../../components/Button", () => ({
  __esModule: true,
  default: ({ clickEvent, action }) => (
    <button onClick={clickEvent}>{action}</button>
  ),
}));

describe("TaskList Component", () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      createdDate: "2025-01-01",
      priority: "High",
    },
    {
      id: 2,
      title: "Task 2",
      createdDate: "2025-01-02",
      priority: "Medium",
    },
  ];

  const handleEditTask = jest.fn();
  const handleDeleteTask = jest.fn();
  const handleMarkComplete = jest.fn();

  test("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleMarkComplete={handleMarkComplete}
      />
    );

    // Check task titles
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    // Check action buttons
    expect(screen.getAllByText("Mark Complete")).toHaveLength(2);
    expect(screen.getAllByText("Edit")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  test("renders no tasks message when task list is empty", () => {
    render(
      <TaskList
        tasks={[]}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleMarkComplete={handleMarkComplete}
      />
    );

    expect(
      screen.getByText("No tasks available. Start by adding a task!")
    ).toBeInTheDocument();
  });

  test("handles button actions correctly", () => {
    render(
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleMarkComplete={handleMarkComplete}
      />
    );

    fireEvent.click(screen.getAllByText("Mark Complete")[0]);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(handleMarkComplete).toHaveBeenCalledWith(1);
    expect(handleEditTask).toHaveBeenCalledWith(tasks[0]);
    expect(handleDeleteTask).toHaveBeenCalledWith(1);
  });
});
