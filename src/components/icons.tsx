import { type SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 2.21 1.79 4 4 4s4-1.79 4-4a4.5 4.5 0 0 0-3.5-4.4" />
      <path d="M12 22a4.5 4.5 0 0 1 4.5-4.5c0-2.21-1.79-4-4-4s-4 1.79-4 4a4.5 4.5 0 0 1 3.5 4.4" />
    </svg>
  ),
};
