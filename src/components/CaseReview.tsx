import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { CaseRecord, FinalAction } from '../types';
import { CaseReviewHeader } from './CaseReviewHeader';
import { ConfirmationModal } from './ConfirmationModal';
import { CaseVideoPlayer } from './CaseVideoPlayer';
import { FINAL_ACTION_OPTIONS, POLICY_BASIS_OPTIONS, CONTEXT_BASIS_OPTIONS } from '../data/tingTingData';

interface CaseReviewProps {
  caseData: CaseRecord;
  hasPrevious: boolean;
  hasNext: boolean;
  onBackToQueue: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onConfirmDecision: (action: FinalAction, basis: string, note: string) => void;
  onOverlaySelect?: (overlay: 'about' | 'policy' | 'communityGuidelines') => void;
  onSelectPolicyForCenter?: (policyName: string, policyId?: string) => void;
}

export const CaseReview: React.FC<CaseReviewProps> = ({
  caseData,
  hasPrevious,
  hasNext,
  onBackToQueue,
  onPrevious,
  onNext,
  onConfirmDecision,
  onOverlaySelect,
  onSelectPolicyForCenter,
}) => {
  const isCompleted = caseData.status === 'Completed';

  // Duration State (reflects detected video duration if available)
  const [activeDuration, setActiveDuration] = useState(caseData.duration);

  useEffect(() => {
    setActiveDuration(caseData.duration);
  }, [caseData.id, caseData.duration]);

  // Form State
  const [selectedAction, setSelectedAction] = useState<FinalAction | null>(
    isCompleted && caseData.recordedAction ? caseData.recordedAction : null
  );
  const [decisionBasis, setDecisionBasis] = useState<string>(
    isCompleted && caseData.recordedDecisionBasis ? caseData.recordedDecisionBasis : ''
  );
  const [moderatorNote, setModeratorNote] = useState<string>(
    isCompleted && caseData.recordedModeratorNote ? caseData.recordedModeratorNote : ''
  );

  // Dropdown & Modal States
  const [isBasisDropdownOpen, setIsBasisDropdownOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Whenever caseData changes (e.g. Previous/Next clicked), sync values
  useEffect(() => {
    if (caseData.status === 'Completed') {
      setSelectedAction(caseData.recordedAction || null);
      setDecisionBasis(caseData.recordedDecisionBasis || '');
      setModeratorNote(caseData.recordedModeratorNote || '');
    } else {
      setSelectedAction(null);
      setDecisionBasis('');
      setModeratorNote('');
    }
    setValidationError(null);
    setIsBasisDropdownOpen(false);
    setIsConfirmationModalOpen(false);
  }, [caseData.id, caseData.status, caseData.recordedAction, caseData.recordedDecisionBasis, caseData.recordedModeratorNote]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsBasisDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActionSelect = (action: FinalAction) => {
    if (isCompleted) return;
    setSelectedAction(action);
    if (validationError) setValidationError(null);
  };

  const handleBasisSelect = (basis: string) => {
    if (isCompleted) return;
    setDecisionBasis(basis);
    setIsBasisDropdownOpen(false);
    if (validationError) setValidationError(null);
  };

  const handleReviewAndConfirm = () => {
    if (isCompleted) return;

    if (!selectedAction || !decisionBasis) {
      if (!selectedAction && !decisionBasis) {
        setValidationError('Please select a Final Action and a Decision Basis.');
      } else if (!selectedAction) {
        setValidationError('Please select a Final Action before confirming.');
      } else {
        setValidationError('Please select a Decision Basis before confirming.');
      }
      return;
    }

    setValidationError(null);
    setIsConfirmationModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleModalConfirmComplete = () => {
    if (selectedAction && decisionBasis) {
      onConfirmDecision(selectedAction, decisionBasis, moderatorNote);
    }
  };

  return (
    <div className="bg-[#FAF9F6] font-body text-[#261E1A] antialiased min-h-screen flex flex-col">
      {/* Header for Screen 2 */}
      <CaseReviewHeader onOverlaySelect={onOverlaySelect} />

      {/* Main Review Workspace */}
      <main className="w-full flex-1 pt-14 md:pt-20 pb-16 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          {/* =========================================================================
              NAVIGATION ROW
              ← Back to Queue | [Case ID] + Status | Previous + Next Case →
              ========================================================================= */}
          <div
            id="review-navigation-bar"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 mb-6 border-b border-[#EAE5DC]"
          >
            {/* Back to Queue Button */}
            <button
              id="back-to-queue-btn"
              type="button"
              onClick={onBackToQueue}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7A726A] hover:text-[#261E1A] transition-colors cursor-pointer select-none group"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span>Back to Queue</span>
            </button>

            {/* Case ID and Current Status Indicator */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-sm sm:text-base font-bold text-[#261E1A] tracking-tight">
                {caseData.id}
              </span>
              <div className="h-4 w-[1px] bg-[#EAE5DC]"></div>
              {isCompleted ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E6B37]/10 text-[#1E6B37]">
                  <span className="w-2 h-2 rounded-full bg-[#1E6B37]"></span>
                  <span className="text-[11px] font-bold tracking-wider uppercase">
                    {caseData.recordedAction || 'COMPLETED'}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C83226]/10 text-[#C83226]">
                  <span
                    className={`w-2 h-2 rounded-full bg-[#C83226] ${
                      caseData.priority === 'Top' ? 'animate-pulse' : ''
                    }`}
                  ></span>
                  <span className="text-[11px] font-bold tracking-wider uppercase">
                    PENDING REVIEW
                  </span>
                </div>
              )}
            </div>

            {/* Previous / Next Case Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                id="prev-case-btn"
                type="button"
                disabled={!hasPrevious}
                onClick={onPrevious}
                className={`px-3 py-1.5 rounded-lg border border-[#EAE5DC] text-xs font-semibold tracking-wider uppercase transition-colors ${
                  hasPrevious
                    ? 'bg-white text-[#261E1A] hover:bg-[#F5F2EB] cursor-pointer'
                    : 'bg-[#FAF9F6] text-[#A8A096] opacity-40 cursor-not-allowed'
                }`}
              >
                Previous
              </button>
              <button
                id="next-case-btn"
                type="button"
                disabled={!hasNext}
                onClick={onNext}
                className={`px-3 py-1.5 rounded-lg border border-[#EAE5DC] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1 ${
                  hasNext
                    ? 'bg-white text-[#261E1A] hover:bg-[#F5F2EB] cursor-pointer'
                    : 'bg-[#FAF9F6] text-[#A8A096] opacity-40 cursor-not-allowed'
                }`}
              >
                <span>Next Case</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              WORKSPACE MAIN GRID (Desktop: 2 Columns, Mobile: Stacked Layout)
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* =========================================================================
                LEFT PANEL: MEDIA & CREATOR METADATA (lg:col-span-5)
                ========================================================================= */}
            <section
              id="review-left-panel"
              aria-label="Media and Creator Information"
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Media Card */}
              <div className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-4">
                {/* 9:16 Video Player Area - Desktop Height-Constrained & Horizontally Centered */}
                <div className="w-full flex justify-center items-center">
                  <div className="w-full lg:w-auto lg:h-[min(600px,65vh)] lg:max-h-[620px] aspect-[9/16] max-w-full flex justify-center">
                    <CaseVideoPlayer
                      caseId={caseData.id}
                      videoUrl={caseData.videoUrl}
                      thumbnailUrl={caseData.thumbnailUrl}
                      initialDuration={caseData.duration}
                      onDurationDetected={(dur) => setActiveDuration(dur)}
                    />
                  </div>
                </div>

                {/* Creator Information */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-base sm:text-lg font-bold text-[#261E1A]">
                    {caseData.creator}
                  </span>
                  <p className="text-sm text-[#342820] leading-relaxed">
                    {caseData.caption}
                  </p>
                  <p className="text-xs text-[#7A726A] pt-1">
                    {activeDuration} · {caseData.language} · {caseData.market}
                  </p>
                </div>

                {/* Compact Metadata Area */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EAE5DC]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A726A]">
                      QUEUE SOURCE
                    </span>
                    <span className="text-xs font-semibold text-[#261E1A] truncate">
                      {caseData.queueSource}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A726A]">
                      QUEUE AGE
                    </span>
                    <span className="text-xs font-semibold text-[#261E1A]">
                      {caseData.queueAge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A726A]">
                      PRIORITY
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        caseData.priority === 'Top'
                          ? 'text-[#C83226]'
                          : caseData.priority === 'Medium'
                          ? 'text-[#8C6D53]'
                          : 'text-[#7A726A]'
                      }`}
                    >
                      {caseData.priority}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =========================================================================
                RIGHT PANEL: SYSTEM INFO, POLICY, FINAL ACTION, DECISION BASIS, NOTES
                ========================================================================= */}
            <section
              id="review-right-panel"
              aria-label="Assessment and Action Panel"
              className="lg:col-span-7 flex flex-col gap-5"
            >
              {/* Card 1: System Information */}
              <div
                id="system-information-card"
                className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
                  <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                    System Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Policy */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#7A726A] font-medium">Policy</span>
                    <span className="text-sm font-semibold text-[#261E1A]">
                      {caseData.policy}
                    </span>
                  </div>

                  {/* Recommended action */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#7A726A] font-medium">
                      Recommended action
                    </span>
                    <span className="text-sm font-semibold text-[#261E1A]">
                      {caseData.recommendedAction}
                    </span>
                  </div>

                  {/* Confidence */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#7A726A] font-medium">Confidence</span>
                    <span className="text-sm font-semibold text-[#261E1A]">
                      {caseData.confidence}
                    </span>
                  </div>
                </div>

                {/* Detected signals */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#EAE5DC]/60">
                  <span className="text-xs text-[#7A726A] font-medium">
                    Detected signals
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {caseData.detectedSignals.map((sig, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-[#342820] bg-[#FAF9F6] border border-[#EAE5DC] px-3 py-1 rounded-lg"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Policy Reference */}
              <div
                id="policy-reference-card"
                className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                    Policy Reference
                  </h3>
                  <span className="font-mono text-xs text-[#7A726A]">
                    {caseData.policyId}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h4 className="text-sm font-bold text-[#261E1A]">
                    {caseData.policyId} · {caseData.policy}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                    {caseData.policyGuidance}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    id="view-full-policy-btn"
                    type="button"
                    onClick={() => {
                      onSelectPolicyForCenter?.(caseData.policy, caseData.policyId);
                      onOverlaySelect?.('policy');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6D53] hover:text-[#261E1A] transition-colors cursor-pointer"
                  >
                    <span>View full policy</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Final Action */}
              <div
                id="final-action-section"
                className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                      Final Action
                    </h3>
                    <p className="text-xs text-[#7A726A] mt-0.5">
                      Select one action to resolve this case
                    </p>
                  </div>
                  {selectedAction && (
                    <span className="text-[11px] font-bold text-[#8C6D53] uppercase tracking-wider">
                      Selected
                    </span>
                  )}
                </div>

                {/* 6 Selectable Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FINAL_ACTION_OPTIONS.map(({ action, description }) => {
                    const isSelected = selectedAction === action;
                    return (
                      <button
                        key={action}
                        type="button"
                        id={`action-btn-${action.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        disabled={isCompleted}
                        onClick={() => handleActionSelect(action)}
                        className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          isCompleted
                            ? isSelected
                              ? 'bg-[#FAF7F2] border-[#8C6D53] opacity-90 cursor-default'
                              : 'bg-white border-[#EAE5DC] opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#FAF7F2] border-[#8C6D53] ring-1 ring-[#8C6D53] cursor-pointer shadow-xs'
                            : 'bg-white border-[#EAE5DC] hover:border-[#C7B5A0] hover:bg-[#FAF9F6] cursor-pointer'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={`text-xs font-bold tracking-wide ${
                              isSelected ? 'text-[#261E1A]' : 'text-[#342820]'
                            }`}
                          >
                            {action}
                          </span>
                          <span className="text-[11px] text-[#7A726A]">
                            {description}
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'border-[#8C6D53] bg-[#8C6D53] text-white'
                              : 'border-[#C7B5A0] bg-white'
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 4: Decision Basis */}
              <div
                id="decision-basis-section"
                ref={dropdownRef}
                className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-3 relative"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                    Decision Basis
                  </h3>
                  <span className="text-[11px] text-[#7A726A]">Required</span>
                </div>

                {/* Custom Basis Dropdown Trigger */}
                <div className="relative">
                  <button
                    id="decision-basis-dropdown-trigger"
                    type="button"
                    disabled={isCompleted}
                    onClick={() => {
                      if (!isCompleted) setIsBasisDropdownOpen((prev) => !prev);
                    }}
                    className={`w-full h-11 px-4 rounded-xl border flex items-center justify-between text-left text-sm transition-colors ${
                      isCompleted
                        ? 'bg-[#FAF9F6] border-[#EAE5DC] text-[#261E1A] cursor-default'
                        : 'bg-white border-[#EAE5DC] hover:border-[#8C6D53] cursor-pointer text-[#261E1A]'
                    }`}
                  >
                    <span className={decisionBasis ? 'font-semibold text-[#261E1A]' : 'text-[#7A726A]'}>
                      {decisionBasis || 'Select decision basis'}
                    </span>
                    {!isCompleted && (
                      isBasisDropdownOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#7A726A]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#7A726A]" />
                      )
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isBasisDropdownOpen && (
                    <div
                      id="decision-basis-menu"
                      className="absolute left-0 right-0 top-12 mt-1 z-30 bg-white border border-[#EAE5DC] rounded-xl shadow-2xl py-2 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
                    >
                      {/* POLICY BASIS CATEGORY */}
                      <div className="px-4 py-1.5 text-[10px] font-bold tracking-wider text-[#7A726A] uppercase bg-[#FAF9F6] border-y border-[#EAE5DC]/60">
                        POLICY BASIS
                      </div>
                      {POLICY_BASIS_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleBasisSelect(opt)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer block ${
                            decisionBasis === opt
                              ? 'bg-[#FAF7F2] text-[#261E1A] font-bold'
                              : 'text-[#342820] hover:bg-[#FAF9F6]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}

                      {/* CONTEXT / DECISION BASIS CATEGORY */}
                      <div className="px-4 py-1.5 text-[10px] font-bold tracking-wider text-[#7A726A] uppercase bg-[#FAF9F6] border-y border-[#EAE5DC]/60 mt-1">
                        CONTEXT / DECISION BASIS
                      </div>
                      {CONTEXT_BASIS_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleBasisSelect(opt)}
                          className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer block ${
                            decisionBasis === opt
                              ? 'bg-[#FAF7F2] text-[#261E1A] font-bold'
                              : 'text-[#342820] hover:bg-[#FAF9F6]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card 5: Moderator Note */}
              <div
                id="moderator-note-section"
                className="w-full bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-[#7A726A] uppercase">
                    Moderator Note
                  </h3>
                  <span className="text-[11px] text-[#7A726A]">Optional</span>
                </div>

                <textarea
                  id="moderator-note-input"
                  rows={3}
                  disabled={isCompleted}
                  value={moderatorNote}
                  onChange={(e) => {
                    if (!isCompleted) setModeratorNote(e.target.value);
                  }}
                  className={`w-full p-3.5 text-sm text-[#261E1A] border rounded-xl transition-all resize-y ${
                    isCompleted
                      ? 'bg-[#FAF9F6] border-[#EAE5DC] cursor-default'
                      : 'bg-white border-[#EAE5DC] focus:outline-none focus:border-[#8C6D53] focus:ring-1 focus:ring-[#8C6D53]'
                  }`}
                />
              </div>

              {/* Restrained Inline Validation Error */}
              {validationError && (
                <div
                  id="inline-validation-error"
                  className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#C83226]/30 text-[#C83226] text-xs font-semibold flex items-center gap-2 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Bottom Action / Confirm Button */}
              <div className="pt-2">
                {isCompleted ? (
                  <button
                    id="decision-recorded-btn"
                    type="button"
                    disabled
                    className="w-full h-12 rounded-xl bg-[#1E6B37]/15 border border-[#1E6B37]/30 text-[#1E6B37] text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-not-allowed select-none"
                  >
                    <span>DECISION RECORDED</span>
                    <span className="text-base font-bold">✓</span>
                  </button>
                ) : (
                  <button
                    id="review-and-confirm-btn"
                    type="button"
                    onClick={handleReviewAndConfirm}
                    className="w-full h-12 rounded-xl bg-[#261E1A] hover:bg-[#3A332E] active:bg-[#1A1412] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer select-none"
                  >
                    <span>REVIEW &amp; CONFIRM</span>
                    <span className="text-base">→</span>
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        caseId={caseData.id}
        finalAction={selectedAction || ''}
        decisionBasis={decisionBasis}
        moderatorNote={moderatorNote}
        onCancel={handleModalCancel}
        onConfirmComplete={handleModalConfirmComplete}
      />
    </div>
  );
};
