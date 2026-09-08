import React from 'react';
import { CaseRecord } from '../types';

interface CaseCardProps {
  caseData: CaseRecord;
  isSelected?: boolean;
  onReadMore: (caseId: string) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData, isSelected, onReadMore }) => {
  return (
    <article
      id={`case-card-${caseData.num}`}
      className={`w-full bg-white border rounded-xl shadow-sm hover:shadow-md hover:border-[#8C6D53]/50 transition-all flex flex-col overflow-hidden ${
        isSelected ? 'ring-2 ring-[#8C6D53] border-[#8C6D53]' : 'border-[#EAE5DC]'
      }`}
    >
      {/* 9:16 Thumbnail Container */}
      <div className="w-full aspect-[9/16] bg-[#FAF9F6] relative overflow-hidden">
        <img
          alt={`Video thumbnail for ${caseData.id}`}
          referrerPolicy="no-referrer"
          src={caseData.thumbnailUrl}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4 bg-white">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs tracking-tight text-[#7A726A]">
            {caseData.id}
          </span>
          <span className="text-base font-bold text-[#342820]">
            {caseData.creator}
          </span>
          <h3 className="text-sm font-semibold text-[#342820] leading-snug pt-0.5">
            {caseData.policy}
          </h3>
          <p className="text-[13px] text-[#7A726A] pt-0.5">
            Priority: {caseData.priority} · Queue age: {caseData.queueAge}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          {/* Status Indicator */}
          {caseData.status === 'Completed' ? (
            <div className="flex items-center gap-1.5 text-[#1E6B37]">
              <span className="w-2 h-2 rounded-full bg-[#1E6B37] inline-block"></span>
              <span className="text-[11px] font-bold tracking-wider uppercase truncate">
                {caseData.recordedAction || 'COMPLETED'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#C83226]">
              <span
                className={`w-2 h-2 rounded-full bg-[#C83226] inline-block ${
                  caseData.priority === 'Top' ? 'animate-pulse' : ''
                }`}
              ></span>
              <span className="text-[11px] font-bold tracking-wider uppercase">
                PENDING REVIEW
              </span>
            </div>
          )}

          {/* Start Review / View Decision Action */}
          <button
            id={caseData.status === 'Completed' ? `view-decision-${caseData.num}` : `start-review-${caseData.num}`}
            type="button"
            onClick={() => onReadMore(caseData.id)}
            className="w-full h-10 rounded-lg bg-[#E8DDCF] border border-[#C7B5A0] hover:bg-[#DFCDBE] active:bg-[#D5C1AF] text-[#342820] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer select-none"
          >
            <span>{caseData.status === 'Completed' ? 'VIEW DECISION' : 'START REVIEW'}</span>
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};
