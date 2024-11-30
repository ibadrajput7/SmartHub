import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { loading } from "../assets";

interface GeneratingProps {
  className?: string;
}

const Generating: React.FC<GeneratingProps> = ({ className }): JSX.Element => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <Image 
        className="w-5 h-5 mr-4" 
        src={loading} 
        width={20}
        height={20}
        alt="Loading" 
      />
      AI is generating
    </div>
  );
};

export default Generating;