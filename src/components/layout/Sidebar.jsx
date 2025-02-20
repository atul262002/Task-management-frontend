// import React from 'react';
import { useTask } from '../../context/TaskContext';
import './Sidebar.css'
const Sidebar = () => {
  const { filters, setFilter, clearFilter } = useTask();
  
  const onChange = e => {
    setFilter(e.target.name, e.target.value);
  };
  
  const onClear = () => {
    clearFilter();
  };
  
  return (
    <div className="sidebar">
      <h3>Filter Tasks</h3>
      <div className="filter-section">
        <label htmlFor="status">Status</label>
        <select 
          name="status" 
          value={filters.status} 
          onChange={onChange}
        >
          <option value="">All Statuses</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      
      <div className="filter-section">
        <label htmlFor="priority">Priority</label>
        <select 
          name="priority" 
          value={filters.priority} 
          onChange={onChange}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <button className="btn btn-light btn-block" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;