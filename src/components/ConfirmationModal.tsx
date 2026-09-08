import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  caseId: string;
  finalAction: string;
  decisionBasis: string;
  moderatorNote: string;
  onCancel: () => void;
  onConfirmComplete: () => void;
}

type ModalStep = 'preview' | 'recording' | 'recorded';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  caseId,
  finalAction,
  decisionBasis,
  moderatorNote,
  onCancel,
  onConfirmComplete,
}) => {
  const [step, setStep] = useState<ModalStep>('preview');

  // Reset to preview whenever opened
  useEffect(() => {
    if (isOpen) {
      setStep('preview');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmClick = () => {
    setStep('recording');
    // ~1.0s loading spinner
    setTimeout(() => {
      setStep('recorded');
      // ~0.7s green check success
      setTimeout(() => {
        onConfirmComplete();
      }, 750);
    }, 1000);
  };

  const hasModeratorNote = Boolean(moderatorNote && moderatorNote.trim());

  return (
    <div
      id="confirmation-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        id="confirmation-modal-card"
        className="w-full max-w-lg bg-white rounded-2xl border border-[#EAE5DC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {step === 'preview' && (
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Modal Header */}
            <div className="flex flex-col gap-1 border-b border-[#EAE5DC] pb-4">
              <span className="text-[11px] font-bold tracking-widest text-[#7A726A] uppercase">
                CONFIRM REVIEW DECISION
              </span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#7A726A] uppercase tracking-wider font-semibold">
                  Case ID
                </span>
                <span className="font-mono text-sm font-bold text-[#261E1A] bg-[#FAF9F6] px-2.5 py-1 rounded border border-[#EAE5DC]">
                  {caseId}
                </span>
              </div>
            </div>

            {/* Decision Details */}
            <div className="flex flex-col gap-4">
              {/* Final Action */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                  FINAL ACTION
                </span>
                <div className="p-3 bg-[#FAF7F2] border border-[#C7B5A0]/60 rounded-xl">
                  <span className="text-sm font-bold text-[#261E1A] tracking-wide block">
                    {finalAction}
                  </span>
                </div>
              </div>

              {/* Decision Basis */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                  DECISION BASIS
                </span>
                <div className="p-3 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl">
                  <span className="text-sm font-medium text-[#342820]">
                    {decisionBasis}
                  </span>
                </div>
              </div>

              {/* Moderator Note (Hidden if empty) */}
              {hasModeratorNote && (
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold tracking-wider text-[#7A726A] uppercase">
                    MODERATOR NOTE
                  </span>
                  <div className="p-3 bg-[#FAF9F6] border border-[#EAE5DC] rounded-xl max-h-36 overflow-y-auto">
                    <p className="text-sm text-[#342820] leading-relaxed whitespace-pre-wrap">
                      {moderatorNote}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#EAE5DC]">
              <button
                id="modal-cancel-btn"
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg border border-[#EAE5DC] text-[#7A726A] hover:text-[#261E1A] hover:bg-[#FAF9F6] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer select-none"
              >
                CANCEL
              </button>
              <button
                id="modal-confirm-btn"
                type="button"
                onClick={handleConfirmClick}
                className="px-6 py-2.5 rounded-lg bg-[#261E1A] text-white hover:bg-[#3A332E] active:bg-[#1A1412] text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer select-none"
              >
                CONFIRM
              </button>
            </div>
          </div>
        )}

        {step === 'recording' && (
          <div
            id="modal-recording-state"
            className="py-16 px-6 flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="w-12 h-12 rounded-full border-3 border-[#EAE5DC] border-t-[#8C6D53] animate-spin"></div>
            <span className="text-xs font-bold tracking-widest text-[#261E1A] uppercase mt-2">
              RECORDING ACTION
            </span>
          </div>
        )}

        {step === 'recorded' && (
          <div
            id="modal-recorded-state"
            className="py-16 px-6 flex flex-col items-center justify-center gap-3 text-center animate-in zoom-in-95 duration-150"
          >
            <div className="w-14 h-14 rounded-full bg-[#1E6B37]/10 text-[#1E6B37] flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="text-xs font-bold tracking-widest text-[#1E6B37] uppercase">
              ACTION RECORDED
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
