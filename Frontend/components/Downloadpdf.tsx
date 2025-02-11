'use client'

import { useState } from 'react';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateSummaryPDF } from '@/app/utils/pdfdownload';
import { SummaryData } from '@/app/(protected)/summaries/types';

interface DownloadSummaryButtonProps {
  summary: SummaryData;
}

export default function DownloadSummaryButton({ summary }: DownloadSummaryButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const pdf = generateSummaryPDF(summary);
      pdf.save(`${summary.title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                 disabled:bg-purple-400 rounded-lg transition-colors text-white"
    >
      <Download className="w-5 h-5" />
      <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
    </button>
  );
}