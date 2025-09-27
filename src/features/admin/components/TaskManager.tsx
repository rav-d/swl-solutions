import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  createdAt: string;
  updatedAt: string;
}

interface TaskManagerProps {
  projectId: string;
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskCreate: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  teamMembers: string[];
}

const TaskManager: React.FC<TaskManagerProps> = ({
  projectId,
  tasks,
  onTaskUpdate,
  onTaskCreate,
  teamMembers
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const taskColumns = [
    { id: 'todo', title: 'To Do', color: '#6B7280' },
    { id: 'in-progress', title: 'In Progress', color: '#3B82F6' },
    { id: 'review', title: 'Review', color: '#F59E0B' },
    { id: 'completed', title: 'Completed', color: '#10B981' }
  ];

  const priorityColors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    
    onTaskUpdate(draggableId, { 
      status: destination.droppableId as any,
      updatedAt: new Date().toISOString()
    });
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Task Management</h3>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {taskColumns.map((column) => (
            <div key={column.id} className="bg-brand-primary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">{column.title}</h4>
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] space-y-3 ${
                      snapshot.isDraggingOver ? 'bg-brand-accent/10 rounded-lg p-2' : ''
                    }`}
                  >
                    {getTasksByStatus(column.id).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileDrag={{ scale: 1.05, rotate: 1 }}
                            onClick={() => setSelectedTask(task)}
                            className={`bg-brand-secondary border border-brand-accent/20 rounded-lg p-3 cursor-pointer hover:border-brand-accent/40 transition-all duration-200 ${
                              snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-white text-sm">{task.title}</h5>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-semibold">
                                    {task.assignee.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span>{task.assignee}</span>
                              </div>
                              <div className={`${isOverdue(task.dueDate) ? 'text-red-400' : ''}`}>
                                {formatDate(task.dueDate)}
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center justify-between">
                              <div className="text-xs text-gray-400">
                                {task.actualHours}/{task.estimatedHours}h
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1 ml-2">
                                <div 
                                  className="bg-brand-accent h-1 rounded-full transition-all duration-300"
                                  style={{ 
                                    width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` 
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setSelectedTask(null)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-brand-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-brand-accent/20"
              >
                <div className="bg-brand-secondary px-6 pt-6 pb-4">
                  <h3 className="text-lg font-medium text-white mb-4">{selectedTask.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                      <p className="text-sm text-gray-400">{selectedTask.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Assignee</label>
                        <p className="text-sm text-white">{selectedTask.assignee}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedTask.priority]}`}>
                          {selectedTask.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                        <p className="text-sm text-white">{formatDate(selectedTask.dueDate)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                        <p className="text-sm text-white capitalize">{selectedTask.status.replace('-', ' ')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Time Tracking</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={selectedTask.actualHours}
                          onChange={(e) => onTaskUpdate(selectedTask.id, { actualHours: parseInt(e.target.value) || 0 })}
                          className="w-20 px-2 py-1 bg-brand-primary border border-brand-accent/30 rounded text-white text-sm"
                        />
                        <span className="text-gray-400">/ {selectedTask.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-primary/30 px-6 py-3 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-brand-primary border border-brand-accent/30 rounded-md hover:bg-brand-primary/70"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;
