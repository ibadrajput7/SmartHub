import jsPDF from 'jspdf';
import { SummaryData } from '@/app/(protected)/summaries/types';

export const generateSummaryPDF = (summary: SummaryData) => {
  const pdf = new jsPDF();
  let yOffset = 20;

  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(33, 33, 33);
  pdf.text(summary.title, 20, yOffset);
  yOffset += 15;

  // Add content
  pdf.setFontSize(12);
  pdf.setTextColor(33, 33, 33);
  const splitText = pdf.splitTextToSize(summary.content, 170);
  
  splitText.forEach((line: string) => {
    if (yOffset > 280) {
      pdf.addPage();
      yOffset = 20;
    }
    pdf.text(line, 20, yOffset);
    yOffset += 10;
  });

  return pdf;
};