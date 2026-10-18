import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Users
} from 'lucide-react';
import { CandidateProfile, CVFileItem } from '../types';
import { INITIAL_CANDIDATES } from '../data/mockData';
import { useToast } from './Toast';

interface Step3UploadCVsProps {
  candidates: CandidateProfile[];
  onUpdateCandidates: (candidates: CandidateProfile[]) => void;
  onProceedToRanking: () => void;
}

export const Step3UploadCVs: React.FC<Step3UploadCVsProps> = ({
  candidates,
  onUpdateCandidates,
  onProceedToRanking
}) => {
  const { showToast } = useToast();
  const [fileList, setFileList] = useState<CVFileItem[]>([
    { id: 'f-1', filename: 'Aarav_Sharma_CV.pdf', fileType: 'pdf', fileSize: '142 KB', status: 'processed', candidateName: 'Aarav Sharma' },
    { id: 'f-2', filename: 'Diya_Patel_CV.pdf', fileType: 'pdf', fileSize: '158 KB', status: 'processed', candidateName: 'Diya Patel' },
    { id: 'f-3', filename: 'Rohan_Mehta_Resume.docx', fileType: 'docx', fileSize: '124 KB', status: 'processed', candidateName: 'Rohan Mehta' },
    { id: 'f-4', filename: 'Ananya_Iyer_Profile.pdf', fileType: 'pdf', fileSize: '136 KB', status: 'processed', candidateName: 'Ananya Iyer' },
    { id: 'f-5', filename: 'Kabir_Singh_Resume.docx', fileType: 'docx', fileSize: '119 KB', status: 'processed', candidateName: 'Kabir Singh' }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCount = fileList.length;
  const processedCount = fileList.filter((f) => f.status === 'processed').length;
  const failedCount = fileList.filter((f) => f.status === 'failed').length;

  const handleLoadDemoCVs = () => {
    const demo: CVFileItem[] = [
      { id: 'f-1', filename: 'Aarav_Sharma_CV.pdf', fileType: 'pdf', fileSize: '142 KB', status: 'processed', candidateName: 'Aarav Sharma' },
      { id: 'f-2', filename: 'Diya_Patel_CV.pdf', fileType: 'pdf', fileSize: '158 KB', status: 'processed', candidateName: 'Diya Patel' },
      { id: 'f-3', filename: 'Rohan_Mehta_Resume.docx', fileType: 'docx', fileSize: '124 KB', status: 'processed', candidateName: 'Rohan Mehta' },
      { id: 'f-4', filename: 'Ananya_Iyer_Profile.pdf', fileType: 'pdf', fileSize: '136 KB', status: 'processed', candidateName: 'Ananya Iyer' },
      { id: 'f-5', filename: 'Kabir_Singh_Resume.docx', fileType: 'docx', fileSize: '119 KB', status: 'processed', candidateName: 'Kabir Singh' }
    ];
    setFileList(demo);
    onUpdateCandidates(INITIAL_CANDIDATES);
    showToast('Loaded 5 Candidate CVs', 'Aarav Sharma, Diya Patel, Rohan Mehta, Ananya Iyer, Kabir Singh', 'success');
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(Array.from(e.target.files));
    }
  };

  const handleFilesAdded = (files: File[]) => {
    const newItems: CVFileItem[] = files.map((file, idx) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isSupported = ext === 'pdf' || ext === 'docx' || ext === 'doc';
      return {
        id: `upload-${Date.now()}-${idx}`,
        filename: file.name,
        fileType: ext === 'docx' ? 'docx' : 'pdf',
        fileSize: `${Math.round(file.size / 1024) || 120} KB`,
        status: isSupported ? 'selected' : 'failed',
        errorMessage: isSupported ? undefined : 'Unsupported format (PDF/DOCX only)',
        candidateName: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
      };
    });

    setFileList((prev) => [...prev, ...newItems]);
    showToast('Files Added', `${newItems.length} candidate file(s) added to queue.`, 'info');
  };

  const handleRemoveFile = (id: string) => {
    setFileList((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed File', 'Item removed from processing list.', 'info');
  };

  const handleProcessCVs = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFileList((prev) =>
        prev.map((f) => (f.status === 'selected' ? { ...f, status: 'processed' } : f))
      );
      if (candidates.length === 0) {
        onUpdateCandidates(INITIAL_CANDIDATES);
      }
      showToast('CV Processing Complete', `Successfully extracted evidence from ${selectedCount - failedCount} files.`, 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in font-sans-ui">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E0D4]">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#252B36]">
            Candidate Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Upload candidate resumes in PDF or DOCX format for job-relevant evidence extraction.
          </p>
        </div>

        <button
          onClick={handleLoadDemoCVs}
          className="px-3.5 py-1.5 bg-[#FFF0C2] hover:bg-[#FFE89E] text-[#A77A22] text-xs font-bold rounded-xl border border-[#F6E3A0] transition-all flex items-center gap-1.5 shadow-2xs self-start sm:self-center cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A77A22]" />
          <span>Load 5 demo CVs (PDF & DOCX mix)</span>
        </button>
      </div>

      {/* Counters Bar with Signature Pastel Identities */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Selected Files: Pale Blue */}
        <div className="p-4 bg-[#F4F7FF] border border-[#DCE8FF] rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Selected Files</div>
            <div className="text-2xl font-bold text-[#252B36] mt-0.5">{selectedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#EDF3FF] text-[#648BEA] border border-[#DCE8FF] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Processed Successfully: Pale Sage */}
        <div className="p-4 bg-[#F1F8F2] border border-[#DCEFE3] rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#347653] uppercase tracking-wider">Processed Successfully</div>
            <div className="text-2xl font-bold text-[#252B36] mt-0.5">{processedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Failed Parsing: Pale Peach */}
        <div className="p-4 bg-[#FFF6ED] border border-[#FFE4D6] rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#C77655] uppercase tracking-wider">Failed Parsing</div>
            <div className="text-2xl font-bold text-[#C77655] mt-0.5">{failedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FFE4D6] text-[#C77655] border border-[#FED0BC] flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Dropzone with Pastel Powder Blue outline */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="border-2 border-dashed border-[#DCE8FF] hover:border-[#648BEA] bg-[#F4F7FF]/40 hover:bg-[#EDF3FF]/60 rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer relative shadow-2xs"
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.doc"
          onChange={handleFileBrowse}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE8FF] text-[#648BEA] flex items-center justify-center shadow-2xs">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#252B36]">
            Drag & drop multiple CV files here, or <span className="text-[#3156A6] underline decoration-[#648BEA]">browse files</span>
          </div>
          <p className="text-[11px] text-[#667085]">
            Supports multi-file upload for PDF (.pdf) and Microsoft Word (.docx).
          </p>
        </div>
      </div>

      {/* Selected Files Table in Crisp White */}
      <div className="bg-white rounded-2xl border border-[#E8E0D4] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E8E0D4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#648BEA]" />
            <h2 className="text-xs font-bold text-[#252B36] uppercase tracking-wider">
              Selected Candidate Files ({fileList.length})
            </h2>
          </div>

          <button
            onClick={handleProcessCVs}
            disabled={isProcessing || selectedCount === 0}
            className="px-3.5 py-1.5 bg-[#252B36] hover:bg-[#1E232C] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Extracting Evidence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#DCE8FF]" />
                <span>Process CVs</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E8E0D4] bg-[#FAF7F2]/60 text-[11px] font-semibold text-[#667085] uppercase tracking-wider">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Filename</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEE5] font-medium">
              {fileList.map((file) => (
                <tr key={file.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#252B36]">
                    {file.candidateName || 'Candidate'}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#667085]">
                    {file.filename}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-[#F3EEE5] text-[#252B36] border border-[#E8E0D4]">
                      {file.fileType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#667085]">{file.fileSize}</td>
                  <td className="py-3 px-4">
                    {file.status === 'processed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCEFE3] text-[#347653] border border-[#C6E2D0]">
                        <Check className="w-3 h-3 text-[#347653]" />
                        <span>Processed</span>
                      </span>
                    ) : file.status === 'failed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE4D6] text-[#C77655] border border-[#FED0BC]">
                        <AlertCircle className="w-3 h-3 text-[#C77655]" />
                        <span>Failed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EDF3FF] text-[#3156A6] border border-[#DCE8FF]">
                        <Clock className="w-3 h-3 text-[#648BEA]" />
                        <span>Ready</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1.5 text-[#667085] hover:text-[#C77655] rounded transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2]/60 border-t border-[#E8E0D4] flex items-center justify-between text-xs">
          <span className="text-[#667085]">
            {processedCount} CVs processed with verifiable evidence extracted.
          </span>
          <button
            onClick={onProceedToRanking}
            className="px-4 py-2 bg-[#252B36] hover:bg-[#1E232C] text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Candidate Ranking</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DCE8FF]" />
          </button>
        </div>
      </div>
    </div>
  );
};
