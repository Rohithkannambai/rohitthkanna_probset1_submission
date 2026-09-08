import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface CaseVideoPlayerProps {
  caseId: string;
  videoUrl: string;
  thumbnailUrl: string;
  initialDuration: string;
  onDurationDetected?: (duration: string) => void;
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const CaseVideoPlayer: React.FC<CaseVideoPlayerProps> = ({
  caseId,
  videoUrl,
  thumbnailUrl,
  initialDuration,
  onDurationDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false);

  // Reset state whenever the caseId or videoUrl changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setHasError(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [caseId, videoUrl]);

  const handleLoadedMetadata = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      const dur = videoRef.current.duration;
      setDuration(dur);
      if (onDurationDetected) {
        onDurationDetected(formatTime(dur));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDraggingScrubber) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleError = () => {
    // Keep thumbnail visible, fail gracefully, no external fallback
    setHasError(true);
    setIsPlaying(false);
  };

  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!videoRef.current || hasError) return;

      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser autoplay / playback restrictions or media load failure
            setIsPlaying(false);
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    },
    [hasError]
  );

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const seekFromClientX = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || !videoRef.current || (!duration && !videoRef.current.duration)) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const totalDur = duration || videoRef.current.duration;
      const targetTime = (clickX / rect.width) * totalDur;
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    },
    [duration]
  );

  const handleProgressBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingScrubber(true);
    seekFromClientX(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekFromClientX(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsDraggingScrubber(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const effectiveDuration = duration > 0 ? duration : 0;
  const progressPercent = effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;
  const displayDuration = duration > 0 ? formatTime(duration) : initialDuration;

  return (
    <div
      ref={containerRef}
      id={`video-player-container-${caseId}`}
      tabIndex={0}
      role="region"
      aria-label="Case Video Player"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => togglePlay()}
      className="w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#261E1A] relative shadow-inner select-none cursor-pointer group"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        key={videoUrl}
        src={videoUrl}
        poster={thumbnailUrl}
        playsInline
        disablePictureInPicture={true}
        controlsList="nofullscreen nodownload noremoteplayback"
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleError}
        className="w-full h-full object-cover"
      />

      {/* Graceful Media Error / Unavailable Poster Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-end">
            <span className="font-mono text-[11px] text-white/90 bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
              {displayDuration}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-white text-center">
            <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5 text-white/80" />
            </div>
            <span className="text-xs text-white/90 font-medium px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs">
              Thumbnail Preview
            </span>
          </div>
          <div className="text-[10px] text-white/60 text-center font-mono">
            {caseId}
          </div>
        </div>
      )}

      {/* Top Header Overlay: Duration Tag */}
      {!hasError && (
        <div className="absolute top-3 right-3 pointer-events-none flex items-center gap-1.5 z-10">
          <span className="font-mono text-xs text-white/95 bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10 shadow-sm">
            {formatTime(currentTime)} / {displayDuration}
          </span>
        </div>
      )}

      {/* Center Large Play / Pause Trigger */}
      {!hasError && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <button
            type="button"
            id="center-play-button"
            aria-label="Play video"
            className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 ml-1 fill-white text-white" />
          </button>
        </div>
      )}

      {/* Bottom Controls Bar (Stitch player design) */}
      {!hasError && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-3 px-3.5 flex flex-col gap-2 transition-opacity duration-200 z-20 ${
            isPlaying && !isHovering ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress / Scrubber Bar */}
          <div
            ref={progressBarRef}
            id="video-scrubber-track"
            role="slider"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={effectiveDuration}
            aria-label="Video Progress Scrubber"
            onMouseDown={handleProgressBarMouseDown}
            className="w-full h-2 rounded-full bg-white/25 hover:h-2.5 transition-all cursor-pointer relative flex items-center"
          >
            {/* Played Track */}
            <div
              className="h-full rounded-full bg-[#C83226] relative"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            >
              {/* Scrubber Knob */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-md border border-[#C83226]"></div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs pt-1">
            {/* Left Controls: Play/Pause, Replay, Mute, Timers */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="controls-play-toggle-btn"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                onClick={(e) => togglePlay(e)}
                className="hover:text-white/80 transition-colors cursor-pointer p-0.5"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
              </button>

              <button
                type="button"
                id="controls-mute-toggle-btn"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                onClick={toggleMute}
                className="hover:text-white/80 transition-colors cursor-pointer p-0.5"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-[#C83226]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <span className="font-mono text-[11px] text-white/80 select-none">
                {formatTime(currentTime)} / {displayDuration}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
