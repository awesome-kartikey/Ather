import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { AtherCapsuleLogo } from '../components/common/AtherCapsuleLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode, UserProfile } from '../engine/types';
import { getRegistrationTranslations, getLandingTranslations } from '../i18n/translations';

interface Props {
  lang: LanguageCode;
  profile?: UserProfile;
  onSelectLang: (lang: LanguageCode) => void;
  onRegister: (name: string, employeeId: string, photoUrl: string) => void;
  onBack: () => void;
  targetStageIndex?: number;
  appMode?: string;
}

export const EmployeeRegistration: React.FC<Props> = ({
  lang,
  onSelectLang,
  onRegister,
  onBack,
  appMode = 'receiving'
}) => {
  const isPicking = appMode === 'picking';
  const t = getRegistrationTranslations(lang);
  const tLanding = getLandingTranslations(lang);
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Always start fresh with blank inputs and no photo on every session
  useEffect(() => {
    setName('');
    setEmployeeId('');
    setPhotoUrl(null);
    setShowValidation(false);
  }, []);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      let stream: MediaStream | null = null;

      // 1. First attempt: standard front-facing selfie camera
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch {
        // 2. Second attempt: relaxed front camera constraint
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
          });
        } catch {
          // 3. Fallback: any available camera
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }
      }

      if (!stream) {
        throw new Error('No camera stream obtained');
      }

      streamRef.current = stream;

      // Attach to persistent video element immediately
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.warn('Video play onloadedmetadata err:', e));
        };
        videoRef.current.play().catch((e) => console.warn('Video direct play err:', e));
      }

      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Front camera access unavailable:', err);
      setCameraError('Front camera unavailable. Use "Upload" or grant camera permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const width = video.videoWidth || 480;
    const height = video.videoHeight || 480;
    const size = Math.min(width, height);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Center-crop square and mirror horizontally (selfie mode)
      const sx = (width - size) / 2;
      const sy = (height - size) / 2;
      ctx.translate(400, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, sx, sy, size, size, 0, 0, 400, 400);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPhotoUrl(dataUrl);
    }
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation rules: All 3 credentials (Photo, Name, Employee ID) are compulsory
  const isNameValid = Boolean(name.trim());
  const isIdValid = Boolean(employeeId.trim());
  const isPhotoValid = Boolean(photoUrl && photoUrl.trim());
  const isFormValid = isNameValid && isIdValid && isPhotoValid;

  const validate = (): boolean => {
    if (!isFormValid) {
      setShowValidation(true);
      return false;
    }
    return true;
  };

  // Submit and start fresh from Module beginning
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    try {
      localStorage.removeItem('ather_stage_idx');
      localStorage.removeItem('ather_scene_idx');
      localStorage.removeItem('ather_xp');
      localStorage.removeItem('ather_points');
      localStorage.removeItem('ather_picking_stage_idx');
      localStorage.removeItem('ather_picking_scene_idx');
      localStorage.removeItem('ather_picking_points');
      localStorage.removeItem('ather_user_profile');
    } catch {
      // ignore
    }
    onRegister(name.trim(), employeeId.trim(), photoUrl!);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-slate-50 text-slate-900 flex flex-col justify-between font-sans relative select-none">
      {/* Background ambient lighting orbs */}
      <div className="fixed top-[-15%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.025] pointer-events-none" />

      {/* ── Top Bar: Dual Branding & Language Switcher (Compact Header with Safe-Area) ── */}
      <header className="shrink-0 w-full px-4 sm:px-6 pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),2.5rem)] pt-[max(env(safe-area-inset-top),0.625rem)] pb-2.5 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.dojoHome}</span>
          </button>
          <div className="h-3.5 w-px bg-slate-300" />
          <AtherCapsuleLogo height={10} />
          <div className="h-3.5 w-px bg-slate-300 hidden sm:block" />
          <a
            href="https://tetrahedron.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 group"
          >
            <img
              src="/logo/Tetrahedron-logo-transparent.svg"
              alt="Tetrahedron"
              className="h-3.5 w-auto object-contain"
            />
            <span className="text-xs font-bold text-slate-700">Tetrahedron</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border hidden md:inline-flex ${
            isPicking
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {isPicking ? tLanding.modePickingBadge : tLanding.modeReceivingBadge}
          </span>
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />
        </div>
      </header>

      {/* ── Main Workstation: Dual-Panel Split (Photo on Left, Inputs on Right) ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-2 sm:pt-4 pb-14 sm:pb-24 px-4 sm:px-6 min-h-0 relative z-10 -mt-4 sm:-mt-8">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-7"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* ── Left Column: Front Camera & Photo Capture Viewport (5 cols) ── */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              {/* Field Label & Compulsory Status */}
              <div className="w-full max-w-[224px] mb-2 flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span>{t.badgePhoto}</span>
                  <span className="text-rose-500 font-extrabold">*</span>
                </label>
                {isPhotoValid ? (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {t.captured}
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md">
                    {t.compulsory}
                  </span>
                )}
              </div>

              {/* Photo Viewport Box */}
              <div
                className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 transition-all shadow-inner flex items-center justify-center ${
                  showValidation && !isPhotoValid
                    ? 'border-rose-400 bg-rose-50/20 ring-4 ring-rose-500/20'
                    : isPhotoValid
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 bg-slate-900'
                    : 'border-slate-200 bg-slate-900'
                }`}
              >
                {/* Persistent Video Element: Always mounted to prevent black-screen race conditions */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover scale-x-[-1] ${isCameraActive ? 'block' : 'hidden'}`}
                />

                {isCameraActive && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-xs z-10">
                    {t.frontCamera}
                  </span>
                )}

                {/* Captured Photo Preview (When camera is inactive) */}
                {!isCameraActive && photoUrl && (
                  <div className="relative w-full h-full bg-slate-100">
                    <img
                      src={photoUrl}
                      alt={t.operatorBadgePhoto}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.captured}</span>
                    </div>
                  </div>
                )}

                {/* Placeholder (When neither camera nor photo is active) */}
                {!isCameraActive && !photoUrl && (
                  <div
                    className={`flex flex-col items-center justify-center p-4 text-center w-full h-full transition-colors ${
                      showValidation && !isPhotoValid ? 'bg-rose-50/40 text-rose-500' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Camera
                      className={`w-10 h-10 mb-2 stroke-[1.5] ${
                        showValidation && !isPhotoValid ? 'text-rose-500 animate-pulse' : 'text-slate-300'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        showValidation && !isPhotoValid ? 'text-rose-700' : 'text-slate-700'
                      }`}
                    >
                      {t.operatorBadgePhoto}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        showValidation && !isPhotoValid ? 'text-rose-600 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {showValidation && !isPhotoValid ? t.photoCompulsorySub : t.frontCameraSub}
                    </span>
                  </div>
                )}
              </div>

              {/* Photo Controls: Always thumb-friendly and concise */}
              <div className="mt-3.5 w-full max-w-[224px] flex flex-col gap-2">
                {isCameraActive ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSnapPhoto}
                      className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{t.snapPhoto}</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-3 min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition-all cursor-pointer"
                    >
                      {t.cancel}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={startCamera}
                      className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        showValidation && !photoUrl
                          ? 'bg-rose-600 hover:bg-rose-700 ring-2 ring-rose-400/40'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {photoUrl ? <RefreshCw className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                      <span>{photoUrl ? t.retakePhoto : t.frontCamera}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title={t.upload}
                      className={`px-3 min-h-[42px] rounded-xl font-bold text-xs border active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                        showValidation && !photoUrl
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{t.upload}</span>
                    </button>

                    {photoUrl && (
                      <button
                        type="button"
                        onClick={() => setPhotoUrl(null)}
                        title={t.removePhoto}
                        className="p-2.5 min-h-[42px] rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 font-bold text-xs border border-slate-200 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Hidden input configured specifically for Android Front Camera capture */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}

                {cameraError && (
                  <p className="text-[11px] text-amber-600 font-medium text-center">
                    {cameraError}
                  </p>
                )}

                {showValidation && !isPhotoValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl text-center shadow-2xs"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{t.photoRequiredAlert}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Right Column: Name, Operator ID & Action Buttons (7 cols) ── */}
            {/* Positioned high to never be obscured by tablet virtual keyboard (~40% from bottom) */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t.traineeSignIn}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. Operator Full Name Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <span>{t.operatorFullName}</span>
                      <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    {isNameValid ? (
                      <span className="text-[10px] font-bold text-emerald-600">{t.valid}</span>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                        {t.compulsory}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className={`w-full px-4 py-2.5 min-h-[46px] rounded-xl border text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${
                      showValidation && !isNameValid
                        ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400 text-slate-900 ring-2 ring-rose-400/20'
                        : 'border-slate-200 bg-slate-50 focus:ring-blue-500 focus:bg-white text-slate-900'
                    }`}
                  />
                  {showValidation && !isNameValid && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {t.nameRequiredAlert}
                    </p>
                  )}
                </div>

                {/* 2. Operator ID Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <span>{t.operatorId}</span>
                      <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    {isIdValid ? (
                      <span className="text-[10px] font-bold text-emerald-600">{t.valid}</span>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                        {t.compulsory}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                    placeholder={t.idPlaceholder}
                    className={`w-full px-4 py-2.5 min-h-[46px] rounded-xl border text-sm sm:text-base font-mono font-bold focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${
                      showValidation && !isIdValid
                        ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400 text-slate-900 ring-2 ring-rose-400/20'
                        : 'border-slate-200 bg-slate-50 focus:ring-blue-500 focus:bg-white text-slate-900'
                    }`}
                  />
                  {showValidation && !isIdValid && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {t.idRequiredAlert}
                    </p>
                  )}
                </div>

                {/* Primary Action Button: Always starts certification from the beginning */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all text-sm sm:text-base shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t.startCertification}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </motion.div>

        {/* Bottom Description & Co-Branding */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold text-slate-600">
            <span className="font-bold text-slate-800">Ather Energy AURIC Plant</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <span className="font-semibold text-slate-600">Digital SOP Training DOJO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <span className="font-bold text-blue-600">Tetrahedron Platform</span>
          </div>
        </div>
      </main>
    </div>
  );
};
