import React from 'react';
// Either remove or use: import { companyLogos } from "../constants";

interface CompanyLogosProps {
  className?: string;
}

const CompanyLogos: React.FC<CompanyLogosProps> = ({ className }): JSX.Element => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping People to Unlock Productivity
      </h5>
    </div>
  );
};

export default CompanyLogos;