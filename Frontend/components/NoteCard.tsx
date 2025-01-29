import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
  onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const content = typeof note.content === 'string' ? 
    JSON.parse(note.content) : note.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#1A1F2B]/90 border-2 border-purple-800/30 rounded-xl p-6 backdrop-blur-xl hover:border-purple-600/50 transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{note.title}</h3>
        <button
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="text-gray-400 space-y-2">
        {Array.isArray(content) ? (
          content.slice(0, 3).map((item: any, index: number) => (
            <p key={index}>• {item.content}</p>
          ))
        ) : (
          <p>{content}</p>
        )}
      </div>
    </motion.div>
  );
};

export default NoteCard;