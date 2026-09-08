import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { PriorityFilter, StatusFilter, PolicyFilter, PriorityLevel, CaseStatus } from '../types';
import { POLICY_CATEGORIES } from '../data/tingTingData';

interface QueueFilterBarProps {
  priorityFilter: PriorityFilter;
  statusFilter: StatusFilter;
  policyFilter: PolicyFilter;
  onPriorityChange: (val: PriorityFilter) => void;
  onStatusChange: (val: StatusFilter) => void;
  onPolicyChange: (val: PolicyFilter) => void;
  onResetAll: () => void;
  pendingCount: number;
  completedCount: number;
}

export const QueueFilterBar: React.FC<QueueFilterBarProps> = ({
  priorityFilter,
  statusFilter,
  policyFilter,
  onPriorityChange,
  onStatusChange,
  onPolicyChange,
  onResetAll,
  pendingCount,
  completedCount,
}) => {
  // Controlled single-dropdown state: only ONE dropdown open at a time
  const [openDropdown, setOpenDropdown] = useState<'priority' | 'status' | 'policy' | null>(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  // Close any open dropdown when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (name: 'priority' | 'status' | 'policy') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleAllClick = () => {
    setOpenDropdown(null); // Close any open dropdown
    onResetAll(); // Reset Priority to All, Status to All, Policy to All
  };

  const isAllActive = priorityFilter === 'ALL' && statusFilter === 'ALL' && policyFilter === 'ALL';

  return (
    <section id="review-queue-header-section" className="w-full px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-2">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-6">
        {/* Title & Status Counters */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-[#261E1A] font-medium tracking-tight">
            REVIEW QUEUE
          </h1>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE5DC] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C83226]"></span>
              <span className="text-sm font-semibold text-[#261E1A]">
                {pendingCount} Pending
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE5DC] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A726A]/40"></span>
              <span className="text-sm font-medium text-[#7A726A]">
                {completedCount} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          ref={filterBarRef}
          className="flex flex-wrap items-center gap-2 pt-1 pb-2 border-b border-[#EAE5DC]"
        >
          {/* ALL Button: Deep Black / Espresso (#261E1A) when active, white text */}
          <button
            id="filter-all-btn"
            type="button"
            onClick={handleAllClick}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer ${
              isAllActive
                ? 'bg-[#261E1A] text-white hover:bg-[#1C150F]'
                : 'bg-white border border-[#EAE5DC] text-[#261E1A] hover:border-[#8C6D53]'
            }`}
          >
            ALL
          </button>

          {/* Priority Dropdown */}
          <div className="relative inline-block text-left" id="dropdown-priority-wrap">
            <button
              id="filter-priority-btn"
              type="button"
              aria-expanded={openDropdown === 'priority'}
              onClick={() => toggleDropdown('priority')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg border text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer ${
                priorityFilter !== 'ALL'
                  ? 'bg-[#7A5A43] text-white border-[#7A5A43]'
                  : 'bg-white border-[#EAE5DC] text-[#261E1A] hover:border-[#8C6D53]'
              }`}
            >
              <span>{priorityFilter !== 'ALL' ? `PRIORITY: ${priorityFilter}` : 'PRIORITY'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  priorityFilter !== 'ALL' ? 'text-white' : 'text-[#7A726A]'
                } ${openDropdown === 'priority' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'priority' && (
              <div
                id="priority-menu"
                className="absolute left-0 mt-1.5 w-36 rounded-lg bg-white border border-[#EAE5DC] shadow-lg z-30 py-1.5 text-xs text-[#261E1A] animate-in fade-in zoom-in-95 duration-100"
              >
                {(['Top', 'Medium', 'Low'] as const).map((level: PriorityLevel) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      onPriorityChange(priorityFilter === level ? 'ALL' : level);
                      setOpenDropdown(null); // Immediately close dropdown
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#FAF9F6] transition-colors font-medium flex items-center justify-between cursor-pointer ${
                      priorityFilter === level ? 'bg-[#FAF9F6] font-bold text-[#8C6D53]' : ''
                    }`}
                  >
                    <span>{level}</span>
                    {priorityFilter === level && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative inline-block text-left" id="dropdown-status-wrap">
            <button
              id="filter-status-btn"
              type="button"
              aria-expanded={openDropdown === 'status'}
              onClick={() => toggleDropdown('status')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg border text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer ${
                statusFilter !== 'ALL'
                  ? 'bg-[#7A5A43] text-white border-[#7A5A43]'
                  : 'bg-white border-[#EAE5DC] text-[#261E1A] hover:border-[#8C6D53]'
              }`}
            >
              <span>{statusFilter !== 'ALL' ? `STATUS: ${statusFilter}` : 'STATUS'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  statusFilter !== 'ALL' ? 'text-white' : 'text-[#7A726A]'
                } ${openDropdown === 'status' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'status' && (
              <div
                id="status-menu"
                className="absolute left-0 mt-1.5 w-36 rounded-lg bg-white border border-[#EAE5DC] shadow-lg z-30 py-1.5 text-xs text-[#261E1A] animate-in fade-in zoom-in-95 duration-100"
              >
                {(['Pending', 'Completed'] as const).map((status: CaseStatus) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      onStatusChange(statusFilter === status ? 'ALL' : status);
                      setOpenDropdown(null); // Immediately close dropdown
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#FAF9F6] transition-colors font-medium flex items-center justify-between cursor-pointer ${
                      statusFilter === status ? 'bg-[#FAF9F6] font-bold text-[#8C6D53]' : ''
                    }`}
                  >
                    <span>{status}</span>
                    {statusFilter === status && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Policy Dropdown */}
          <div className="relative inline-block text-left" id="dropdown-policy-wrap">
            <button
              id="filter-policy-btn"
              type="button"
              aria-expanded={openDropdown === 'policy'}
              onClick={() => toggleDropdown('policy')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg border text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer max-w-[280px] truncate ${
                policyFilter !== 'ALL'
                  ? 'bg-[#7A5A43] text-white border-[#7A5A43]'
                  : 'bg-white border-[#EAE5DC] text-[#261E1A] hover:border-[#8C6D53]'
              }`}
            >
              <span className="truncate">
                {policyFilter !== 'ALL' ? policyFilter : 'POLICY'}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform ${
                  policyFilter !== 'ALL' ? 'text-white' : 'text-[#7A726A]'
                } ${openDropdown === 'policy' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'policy' && (
              <div
                id="policy-menu"
                className="absolute left-0 mt-1.5 w-72 max-w-[90vw] rounded-lg bg-white border border-[#EAE5DC] shadow-lg z-30 py-1.5 text-xs text-[#261E1A] animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto"
              >
                {POLICY_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      onPolicyChange(policyFilter === category ? 'ALL' : category);
                      setOpenDropdown(null); // Immediately close dropdown
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#FAF9F6] transition-colors truncate font-medium flex items-center justify-between cursor-pointer ${
                      policyFilter === category ? 'bg-[#FAF9F6] font-bold text-[#8C6D53]' : ''
                    }`}
                  >
                    <span className="truncate pr-2">{category}</span>
                    {policyFilter === category && <span className="text-xs shrink-0">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
