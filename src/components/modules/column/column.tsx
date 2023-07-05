import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Column: React.FC<Props> = ({ children }) => {
  return (
    <td className="table-cell h-8 w-28 max-w-[112px] overflow-hidden border border-border  first:border-r-0 last:border-l-0">
      {children}
    </td>
  );
};

export default Column;
