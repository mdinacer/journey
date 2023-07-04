import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Column: React.FC<Props> = ({ children }) => {
  return (
    <td className='table-cell h-6 max-h-6 w-28 max-w-[112px] overflow-hidden border border-border p-0'>
      {children}
    </td>
  );
};

export default Column;
