import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  score: number;
  value: string;
  source: string;
  lastContact?: string;
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  leads: Lead[];
}

interface PipelineViewProps {
  stages: PipelineStage[];
  onLeadMove: (leadId: string, fromStage: string, toStage: string) => void;
  onLeadClick: (lead: Lead) => void;
}

const PipelineView: React.FC<PipelineViewProps> = ({
  stages,
  onLeadMove,
  onLeadClick
}) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (destination.droppableId === source.droppableId) return;
    
    onLeadMove(draggableId, source.droppableId, destination.droppableId);
    setDraggedLead(null);
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Sales Pipeline</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-brand-accent/20 text-brand-accent rounded-full hover:bg-brand-accent/30 transition-colors">
            View All
          </button>
          <button className="px-3 py-1 text-xs bg-gray-600 text-gray-300 rounded-full hover:bg-gray-500 transition-colors">
            Export
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {stages.map((stage, stageIndex) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <div className="bg-brand-primary/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{stage.name}</h4>
                  <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                    {stage.leads.length}
                  </span>
                </div>
                
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] space-y-3 ${
                        snapshot.isDraggingOver ? 'bg-brand-accent/10 rounded-lg' : ''
                      }`}
                    >
                      {stage.leads.map((lead, leadIndex) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={leadIndex}
                        >
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.02 }}
                              whileDrag={{ scale: 1.05, rotate: 2 }}
                              onClick={() => onLeadClick(lead)}
                              className={`bg-brand-secondary border border-brand-accent/20 rounded-lg p-3 cursor-pointer hover:border-brand-accent/40 transition-all duration-200 ${
                                snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-white text-sm">{lead.name}</h5>
                                  <p className="text-xs text-gray-400">{lead.company}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-semibold text-green-400">{lead.value}</div>
                                  <div className="text-xs text-gray-500">{lead.source}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }}></div>
                                  <span className="text-xs text-gray-400">Score: {lead.score}</span>
                                </div>
                                {lead.lastContact && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(lead.lastContact).toLocaleDateString()}
                                  </span>
                                )}
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
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default PipelineView;
