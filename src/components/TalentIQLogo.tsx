import React from 'react';

interface TalentIQLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const TalentIQLogo: React.FC<TalentIQLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
    xl: 'w-9 h-9'
  }[size];

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg font-bold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-bold'
  }[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Exact TalentIQ folded blue leaf / petal icon mark */}
      <div className={`${iconDimensions} relative shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Back curved petal (medium blue) */}
          <path
            d="M6 21C5 15.5 8 8 14 5.5C20 3 26 6 26 12C26 18 20 24 13.5 24.5C9.5 25 7 23 6 21Z"
            fill="url(#iq_blue_back)"
          />
          {/* Front folded petal (vibrant royal blue) */}
          <path
            d="M12.5 24.5C9 23 8.5 18.5 10.5 14C12.5 9.5 17 6.5 22.5 8C27 9.5 28 15 26 19.5C24 24 18 25.5 12.5 24.5Z"
            fill="url(#iq_blue_front)"
          />
          <defs>
            <linearGradient id="iq_blue_back" x1="5" y1="5" x2="26" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3156A6" />
              <stop offset="1" stopColor="#648BEA" />
            </linearGradient>
            <linearGradient id="iq_blue_front" x1="9" y1="7" x2="28" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#648BEA" />
              <stop offset="1" stopColor="#9BB8F9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className={`tracking-tight font-sans text-[#252B36] font-bold ${textSizes}`}>
          TalentIQ
        </span>
      )}
    </div>
  );
};
