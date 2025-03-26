import React from 'react';
import { X, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Connection } from '../../types/connection';

interface ProfileModalProps {
  connection: Connection;
  onClose: () => void;
}

export function ProfileModal({ connection, onClose }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{connection.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-6 mb-8">
            <img 
              src={connection.avatar} 
              alt={connection.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">{connection.role}</h3>
              <p className="text-gray-600 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                {connection.location}
              </p>
              <p className="text-gray-700">{connection.bio}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Expertise</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {connection.expertise.map((item) => (
                  <span key={item} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {connection.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experience
              </h4>
              <div className="space-y-4 mb-6">
                {connection.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-emerald-500 pl-4">
                    <h5 className="font-medium">{exp.position}</h5>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h4>
              <div className="space-y-4">
                {connection.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-emerald-500 pl-4">
                    <h5 className="font-medium">{edu.degree}</h5>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}