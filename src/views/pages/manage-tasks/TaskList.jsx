import React from "react";
import Button from "../../../components/Button";

const TaskList = ({
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleMarkComplete,
}) => {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-date">
              Created: {new Date(task.createdDate).toLocaleDateString()}
            </p>
            <p className="task-priority">Priority: {task.priority}</p>
            <div className="task-actions">
              <Button
                clickEvent={() => handleMarkComplete(task.id)}
                className="mark-complete-btn"
                action={"Mark Complete"}
              />

              <Button
                clickEvent={() => handleEditTask(task)}
                className="edit-btn"
                action={"Edit"}
              />

              <Button
                clickEvent={() => handleDeleteTask(task.id)}
                className="delete-btn"
                action={"Delete"}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available. Start by adding a task!</p>
      )}
    </div>
  );
};

export default TaskList;
