import React, { useState } from 'react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

type UserRole = 'entrepreneur' | 'mentor' | 'investor';

interface RoleData {
  role: UserRole;
  details: {
    entrepreneur?: {
      startupStage?: 'ideation' | 'mvp' | 'launched';
      fundingNeeds?: boolean;
      industry?: string;
      industryFocus?: string[];
      skillsNeeded?: string[];
    };
    mentor?: {
      expertise?: string[];
      yearsOfExperience?: number;
      availabilityHours?: number;
      successfulExits?: number;
    };
    investor?: {
      investmentStage?: string[];
      ticketSize?: {
        min: number;
        max: number;
      };
      portfolioSize?: number;
      sectorsOfInterest?: string[];
    };
  };
}

interface Props {
  onNext: (data: { role: UserRole; details: RoleData['details']; industry?: string }) => void;
  data?: any;
}

const roles = [
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'I want to start or grow my business',
    icon: Briefcase
  },
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'I want to guide and support entrepreneurs',
    icon: Users
  },
  {
    id: 'investor',
    title: 'Investor',
    description: 'I want to invest in promising startups',
    icon: TrendingUp
  }
] as const;

export function RoleSelection({ onNext }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [details, setDetails] = useState<RoleData['details']>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    // Extract industry if entrepreneur
    const industry = selectedRole === 'entrepreneur' ? details.entrepreneur?.industry : undefined;

    onNext({
      role: selectedRole,
      details,
      industry
    });
  };

  const renderRoleDetails = () => {
    if (!selectedRole) return null;

    switch (selectedRole) {
      case 'entrepreneur':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Startup Stage
              </label>
              <select
                value={details.entrepreneur?.startupStage || 'ideation'}
                onChange={(e) => setDetails({
                  entrepreneur: {
                    ...details.entrepreneur,
                    startupStage: e.target.value as any
                  }
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="ideation">Ideation</option>
                <option value="mvp">MVP</option>
                <option value="launched">Launched</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Looking for Funding?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="fundingNeeds"
                    checked={details.entrepreneur?.fundingNeeds === true}
                    onChange={() => setDetails({
                      entrepreneur: {
                        ...details.entrepreneur,
                        fundingNeeds: true
                      }
                    })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="fundingNeeds"
                    checked={details.entrepreneur?.fundingNeeds === false}
                    onChange={() => setDetails({
                      entrepreneur: {
                        ...details.entrepreneur,
                        fundingNeeds: false
                      }
                    })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                value={details.entrepreneur?.industry || ''}
                onChange={(e) => setDetails({
                  entrepreneur: {
                    ...details.entrepreneur,
                    industry: e.target.value
                  }
                })}
                placeholder="e.g. Healthcare, Fintech, E-commerce"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
        );

      case 'mentor':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={details.mentor?.yearsOfExperience || ''}
                onChange={(e) => setDetails({
                  mentor: {
                    ...details.mentor,
                    yearsOfExperience: parseInt(e.target.value)
                  }
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Hours per Week
              </label>
              <input
                type="number"
                value={details.mentor?.availabilityHours || ''}
                onChange={(e) => setDetails({
                  mentor: {
                    ...details.mentor,
                    availabilityHours: parseInt(e.target.value)
                  }
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
        );

      case 'investor':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Stages
              </label>
              <div className="flex flex-wrap gap-2">
                {['seed', 'seriesA', 'seriesB', 'growth'].map((stage) => (
                  <label key={stage} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={details.investor?.investmentStage?.includes(stage) || false}
                      onChange={(e) => {
                        const stages = details.investor?.investmentStage || [];
                        setDetails({
                          investor: {
                            ...details.investor,
                            investmentStage: e.target.checked
                              ? [...stages, stage]
                              : stages.filter(s => s !== stage)
                          }
                        });
                      }}
                      className="mr-2"
                    />
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Portfolio Size
              </label>
              <input
                type="number"
                value={details.investor?.portfolioSize || ''}
                onChange={(e) => setDetails({
                  investor: {
                    ...details.investor,
                    portfolioSize: parseInt(e.target.value)
                  }
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map(({ id, title, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedRole(id as UserRole)}
            className={`p-6 rounded-xl text-left transition-all ${
              selectedRole === id
                ? 'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </button>
        ))}
      </div>

      {selectedRole && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 dark:text-white">Additional Information</h4>
          {renderRoleDetails()}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedRole}
        className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}