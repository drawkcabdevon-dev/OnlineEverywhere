import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { IconCpu } from '../constants';

const ProjectHub: React.FC = () => {
  const { projects, setActiveProjectId, createProject } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectPurpose, setNewProjectPurpose] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  const handleCreateProject = () => {
    if (newProjectName && newProjectPurpose) {
      createProject(newProjectName, newProjectPurpose, newProjectUrl);
      setIsModalOpen(false);
      setNewProjectName('');
      setNewProjectPurpose('');
      setNewProjectUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-gray-900">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="inline-flex items-center justify-center bg-[var(--color-primary)] p-4 rounded-2xl mb-6 shadow-lg shadow-indigo-200">
            <IconCpu className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome to OnLineEverywhere</h1>
        <p className="text-lg text-gray-500 mt-3 max-w-xl">Your AI-Powered Marketing Co-Pilot. Select a project to begin.</p>
      </div>

      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
          <Button onClick={() => setIsModalOpen(true)}>Create New Project</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} onClick={() => setActiveProjectId(project.id)} className="p-6 flex flex-col hover:border-[var(--color-primary)] transition-colors cursor-pointer h-full bg-white shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{project.name}</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3">{project.foundation.businessDescription}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xs text-gray-400">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                <span className="text-xs font-medium text-[var(--color-primary-dark)] bg-indigo-50 px-2 py-1 rounded-full">Active</span>
              </div>
            </Card>
          ))}
          {projects.length === 0 && (
              <div 
                onClick={() => setIsModalOpen(true)} 
                className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-[var(--color-primary)] hover:bg-white transition-all duration-300 group min-h-[200px]"
              >
                <div className="p-3 bg-gray-100 rounded-full mb-3 group-hover:bg-indigo-50 transition-colors">
                    <IconCpu className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-primary)]" />
                </div>
                <p className="text-gray-500 font-medium group-hover:text-gray-900">No projects yet</p>
                <p className="text-sm text-[var(--color-primary)] mt-1 font-semibold">Create your first project</p>
              </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a New Project">
        <div className="space-y-5">
          <div>
            <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="block w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 p-2.5"
              placeholder="e.g., SyncFlow SaaS Launch"
            />
          </div>
          <div>
            <label htmlFor="projectPurpose" className="block text-sm font-semibold text-gray-700 mb-1">Website's Purpose / Business Description</label>
            <textarea
              id="projectPurpose"
              rows={3}
              value={newProjectPurpose}
              onChange={(e) => setNewProjectPurpose(e.target.value)}
              className="block w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 p-2.5"
              placeholder="e.g., A B2B SaaS for creative agencies to manage projects."
            />
          </div>
           <div>
            <label htmlFor="projectUrl" className="block text-sm font-semibold text-gray-700 mb-1">Existing Website URL (Optional)</label>
            <input
              type="url"
              id="projectUrl"
              value={newProjectUrl}
              onChange={(e) => setNewProjectUrl(e.target.value)}
              className="block w-full bg-white border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 p-2.5"
              placeholder="https://example.com"
            />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button onClick={handleCreateProject} disabled={!newProjectName || !newProjectPurpose}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectHub;