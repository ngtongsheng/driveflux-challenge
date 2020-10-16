import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  thead?: ReactNode;
}

export const Table: FunctionComponent<TableProps> = ({ thead, children }) => {
  return (
    <>
      <table className="table is-narrow is-hoverable is-fullwidth">
        <thead>{thead}</thead>
        <tbody>{children}</tbody>
      </table>
      <style jsx>{`
        table.table :global(tr td) {
          vertical-align: middle;
        }

        table.table thead :global(tr th) {
          background: #363636;
          color: #fff;
        }

        table.table thead :global(tr th) {
          padding: 1.25em;
        }
        table.table tbody :global(tr td) {
          padding: 0.75em 1.25em;
        }
      `}</style>
    </>
  );
};

export default Table;
