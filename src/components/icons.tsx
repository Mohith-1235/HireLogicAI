import type { SVGProps } from 'react';

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
      <path d="M10 16l-4-4 4-4" />
      <path d="M14 8l4 4-4 4" />
      <path d="M6 20v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4" />
      <path d="M12 12V4" />
    </svg>
  ),
};
