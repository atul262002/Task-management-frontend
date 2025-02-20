import { createContext, useContext, useReducer } from 'react';
import taskService from '../services/taskService';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  current: null,
  loading: true,
  error: null,
  filtered: null,
  filters: {
    status: '',
    priority: ''
  }
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        current: null,
        loading: false
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        loading: false
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null
      };
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: action.payload.value
        }
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filters: {
          status: '',
          priority: ''
        }
      };
    default:
      return state;
  }
};
// export const TaskProvider = ({ children }) => {
// eslint-disable-next-line react/prop-types
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get Tasks
  const getTasks = async (filters = state.filters) => {
    try {
      const tasks = await taskService.getTasks(filters);
      dispatch({
        type: 'GET_TASKS',
        payload: tasks
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.message
      });
    }
  };

  // Add Task
  const addTask = async (task) => {
    try {
      const newTask = await taskService.createTask(task);
      dispatch({
        type: 'ADD_TASK',
        payload: newTask
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.message
      });
    }
  };

  // Update Task
  const updateTask = async (task) => {
    try {
      const updatedTask = await taskService.updateTask(task._id, task);
      dispatch({
        type: 'UPDATE_TASK',
        payload: updatedTask
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.message
      });
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.message
      });
    }
  };

  // Set Current Task
  const setCurrent = (task) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: task
    });
  };

  // Clear Current Task
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Set Filter
  const setFilter = (type, value) => {
    dispatch({
      type: 'SET_FILTER',
      payload: { type, value }
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        setFilter,
        clearFilter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);