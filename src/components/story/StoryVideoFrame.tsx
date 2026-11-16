import React, { useState, useEffect, useRef } from 'react';
import { Video } from 'lucide-react';

interface StoryVideoFrameProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
  pauseAtSecond?: number;
}

export const StoryVideoFrame: React.FC<StoryVideoFrameProps> = ({
  videoSrc,
  posterSrc,
  title,
  isPaused,
  onPauseReached,
  pauseAtSecond,
}) => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);

  // Reset pause trigger when video changes
  useEffect(() => {
    setHasTriggeredPause(false);
    setVideoError(false);
  }, [videoSrc]);

  // Handle scheduled pause (e.g. truck pulling in and stopping at gate)
  useEffect(() => {
    if (pauseAtSecond && !hasTriggeredPause && !isPaused) {
      const delayMs = pauseAtSecond * 1000;
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
        if (onPauseReached) {
          onPauseReached();
        }
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [pauseAtSecond, hasTriggeredPause, isPaused, onPauseReached]);

  // Sync play/pause state with parent
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    if (isPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isPaused, videoSrc]);

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md select-none flex items-center justify-center">
      {!videoError ? (
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop={!isPaused && !pauseAtSecond}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            if (videoRef.current && !isPaused) {
              videoRef.current.defaultMuted = true;
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          }}
          onError={(e) => {
            console.warn('[Ather DOJO] Video stream loading error:', videoSrc, e);
            setVideoError(true);
          }}
          className="w-full h-full object-cover"
        />
      ) : posterSrc ? (
        <img
          src={posterSrc}
          alt={title || 'Ather Facility Video Poster'}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
          <Video className="w-8 h-8 text-slate-600" />
          <span className="text-xs font-mono">Video unavailable</span>
        </div>
      )}
    </div>
  );
};
