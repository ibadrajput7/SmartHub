import jsPDF from 'jspdf';
import { Note } from '@/app/(protected)/notes/types';


export const generatePDF = (notes: Note[], title: string, totalScore: number) => {
  const pdf = new jsPDF();
  let yOffset = 20;

  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(33, 33, 33);
  pdf.text(title, 20, yOffset);
  yOffset += 15;

  // Add total score
  pdf.setFontSize(12);
  pdf.text(`Total Importance Score: ${totalScore}`, 20, yOffset);
  yOffset += 15;

  // Add notes
  notes.forEach((note, index) => {
    if (yOffset > 280) {
      pdf.addPage();
      yOffset = 20;
    }

    // Note content
    pdf.setTextColor(33, 33, 33);
    const noteText = `${index + 1}. ${note.content}`;
    const splitText = pdf.splitTextToSize(noteText, 170);
    pdf.text(splitText, 20, yOffset);
    yOffset += 10 * splitText.length;

    // Score
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Importance Score: ${note.importance_score}`, 20, yOffset);
    yOffset += 15;
  });

  return pdf;
};