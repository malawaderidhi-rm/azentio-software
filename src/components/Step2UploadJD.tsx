import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { JobDescription } from '../types';
import { SAMPLE_JD_FRONTEND_RAW, INITIAL_JOB_DESCRIPTION } from '../data/mockData';
import { useToast } from './Toast';

interface Step2UploadJDProps {
  currentJD: JobDescription;
  onConfirmJD: (confirmedJD: JobDescription) => void;
  isLiveAi: boolean;
}

export const Step2UploadJD: React.FC<Step2UploadJDProps> = ({
  currentJD,
  onConfirmJD,
  isLiveAi
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<JobDescription>(currentJD);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(100);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: 'jd_frontend_developer.pdf',
    size: '145 KB'
  });
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedInput, setPastedInput] = useState(SAMPLE_JD_FRONTEND_RAW);

  const handleLoadSampleJD = () => {
    setIsProcessing(true);
    setProgressPercent(35);
    setUploadedFile({ name: 'jd_frontend_developer.pdf', size: '145 KB' });

    setTimeout(() => {
      setProgressPercent(75);
    }, 200);

    setTimeout(() => {
      setProgressPercent(100);
      setIsProcessing(false);
      setFormData(INITIAL_JOB_DESCRIPTION);
      showToast('Sample JD Loaded', 'Extracted requirements for Frontend Developer (Bengaluru)', 'success');
    }, 550);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadedFile({ name: file.name, size: `${Math.round(file.size / 1024)} KB` });
    setIsProcessing(true);
    setProgressPercent(20);

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    showToast('File uploaded', `${file.name} successfully analyzed.`, 'info');
  };

  const handleConfirm = () => {
    const updated = {
      ...formData,
      isConfirmed: true
    };
    onConfirmJD(updated);
    showToast('Role Requirements Confirmed', 'Frontend Developer role criteria saved.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E0D4]">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
            Job Description Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Upload a JD or paste text to extract key requirements using AI.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadSampleJD}
            className="px-3.5 py-1.5 bg-[#FFF0C2] hover:bg-[#FFE89E] text-[#A77A22] text-xs font-bold rounded-xl border border-[#F6E3A0] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A77A22]" />
            <span>Use Sample JD</span>
          </button>

          <button
            onClick={() => setShowPasteModal(true)}
            className="px-3.5 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#252B36] text-xs font-bold rounded-xl border border-[#E8E0D4] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#667085]" />
            <span>Paste text</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Extracted Details (Left 2 Cols) | Skills Overview (Right 1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Dropzone Card */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-[#DCE8FF] hover:border-[#648BEA] bg-[#F4F7FF]/50 hover:bg-[#EDF3FF]/70 rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer relative shadow-2xs"
          >
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE8FF] text-[#648BEA] flex items-center justify-center shadow-2xs">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#252B36]">
                Drag & drop your JD here <span className="text-[#667085] font-normal">or</span> <span className="text-[#3156A6] underline decoration-[#648BEA]">click to browse</span>
              </div>
              <p className="text-[11px] text-[#667085]">
                Supports PDF, DOCX, TXT (max 10MB)
              </p>
            </div>
          </div>

          {/* Uploaded File Progress Bar Card */}
          {uploadedFile && (
            <div className="p-3.5 bg-white border border-[#E8E0D4] rounded-2xl shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#252B36] truncate">
                    {uploadedFile.name}
                  </div>
                  <div className="w-36 sm:w-48 bg-[#EDF3FF] h-1.5 rounded-full overflow-hidden mt-1 border border-[#DCE8FF]/50">
                    <div
                      className="bg-[#648BEA] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#667085] font-medium">
                  {progressPercent < 100 ? `Processing... ${progressPercent}%` : 'Processed 100%'}
                </span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="p-1 text-[#667085] hover:text-[#252B36] rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Extracted Job Details Form */}
          <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs p-5 sm:p-6 space-y-5">
            <h2 className="text-xs font-bold text-[#252B36] uppercase tracking-wider">
              Extracted Job Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2DDD3] focus:outline-none focus:ring-1 focus:ring-[#78716C] focus:border-[#78716C] bg-white text-[#1C1917]"
                />
              </div>

              {/* Department / Function */}
              <div>
                <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                  Department / Function
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2DDD3] focus:outline-none focus:ring-1 focus:ring-[#78716C] focus:border-[#78716C] bg-white text-[#1C1917] appearance-none pr-8"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="Product">Product</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8479] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Location / Work Arrangement */}
              <div>
                <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                  Location / Work Arrangement
                </label>
                <div className="relative">
                  <select
                    value={formData.workArrangement}
                    onChange={(e) => setFormData({ ...formData, workArrangement: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2DDD3] focus:outline-none focus:ring-1 focus:ring-[#78716C] focus:border-[#78716C] bg-white text-[#1C1917] appearance-none pr-8"
                  >
                    <option value="Bengaluru - Hybrid">Bengaluru - Hybrid</option>
                    <option value="Bengaluru - On-site">Bengaluru - On-site</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8479] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Required Experience */}
              <div>
                <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                  Required Experience
                </label>
                <div className="relative">
                  <select
                    value={`${formData.minExperienceYears}-${formData.maxExperienceYears} years`}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes('2-5')) {
                        setFormData({ ...formData, minExperienceYears: 2, maxExperienceYears: 5 });
                      } else if (val.includes('0-2')) {
                        setFormData({ ...formData, minExperienceYears: 0, maxExperienceYears: 2 });
                      } else {
                        setFormData({ ...formData, minExperienceYears: 5, maxExperienceYears: 8 });
                      }
                    }}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2DDD3] focus:outline-none focus:ring-1 focus:ring-[#78716C] focus:border-[#78716C] bg-white text-[#1C1917] appearance-none pr-8"
                  >
                    <option value="2-5 years">2-5 years</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="5-8 years">5-8 years</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8479] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Education / Certifications */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                  Education / Certifications
                </label>
                <div className="relative">
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E2DDD3] focus:outline-none focus:ring-1 focus:ring-[#78716C] focus:border-[#78716C] bg-white text-[#1C1917] appearance-none pr-8"
                  >
                    <option value="Bachelor's in Computer Science (or related field)">
                      Bachelor&apos;s in Computer Science (or related field)
                    </option>
                    <option value="Master's in Computer Science">Master&apos;s in Computer Science</option>
                    <option value="Equivalent Practical Experience">Equivalent Practical Experience</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8479] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* View full details button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowPasteModal(true)}
                className="px-4 py-2 bg-[#292524] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                View full details
              </button>
            </div>

            {/* Required Skills Chips */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#44403C]">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#F5F1EA] text-[#292524] rounded-xl text-xs font-bold border border-[#E5DFD4]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Skills Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#44403C]">
                Preferred Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#FAF7F2] text-[#57534E] rounded-xl text-xs font-semibold border border-[#EAE5DC]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#44403C]">
                Key Responsibilities
              </label>
              <div className="space-y-1.5 text-xs text-[#57534E] pl-1 font-medium">
                {formData.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#8C8479]">•</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review and confirm Button */}
            <div className="pt-3 border-t border-[#E8E0D4]">
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-[#252B36] hover:bg-[#1E232C] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Confirm role requirements</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DCE8FF]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Skills Overview Card */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs p-5 sm:p-6 space-y-5">
            <h2 className="text-xs font-bold text-[#252B36] uppercase tracking-wider">
              Skills Overview
            </h2>

            {/* Required Skills in Right Card: Powder Blue & Deep Blue */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#3156A6] uppercase tracking-wider">
                Required Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {formData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[#EDF3FF] text-[#3156A6] rounded-xl text-xs font-bold border border-[#DCE8FF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Skills in Right Card: Soft Lilac & Muted Violet */}
            <div className="space-y-2 pt-2 border-t border-[#E8E0D4]">
              <span className="text-[11px] font-bold text-[#7657B6] uppercase tracking-wider">
                Preferred Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {formData.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[#EAE1FF] text-[#7657B6] rounded-xl text-xs font-semibold border border-[#D9CAFA]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* JD successfully processed notice box: Pale Sage Green */}
            <div className="p-3.5 bg-[#DCEFE3]/50 border border-[#C6E2D0] rounded-2xl space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#347653]">
                <CheckCircle2 className="w-4 h-4 text-[#347653]" />
                <span>JD successfully processed</span>
              </div>
              <p className="text-[11px] text-[#347653]/90 leading-relaxed">
                Extracted criteria saved and ready for candidate matching & stack ranking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Details Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#EAE5DC] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EBE3] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8C6D46]" />
                <h3 className="font-bold text-[#1C1917] text-base">Job Description Full Specification</h3>
              </div>
              <button
                onClick={() => setShowPasteModal(false)}
                className="p-1 text-[#8C8479] hover:text-[#1C1917] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={12}
              value={pastedInput}
              onChange={(e) => setPastedInput(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-[#FAF7F2] border border-[#EAE5DC] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#78716C]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 border border-[#E2DDD3] rounded-xl text-xs font-bold text-[#57534E] hover:bg-[#F5F1EA]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, rawText: pastedInput });
                  setShowPasteModal(false);
                  showToast('Updated', 'Job description text updated.', 'success');
                }}
                className="px-4 py-2 bg-[#1C1917] text-white rounded-xl text-xs font-bold hover:bg-[#292524]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
