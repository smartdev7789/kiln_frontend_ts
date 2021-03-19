import React from "react";
import { Segment, Table } from "semantic-ui-react";

export type Row = {
  id: number | string;
  cellContents: (string | JSX.Element | JSX.Element[])[];
};

export type TableCardProps = {
  children?: React.ReactNode;
  headers: string[];
  rowContents?: Row[];
};

export const TableCard = ({
  children,
  headers,
  rowContents = [],
}: TableCardProps) => {
  return (
    <Segment
      className="full-width no-padding borderless"
      style={{ minHeight: "5em" }}
    >
      <Table>
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rowContents.map((row) => {
            return (
              <Table.Row key={row.id}>
                {row.cellContents.map((contents, i) => (
                  <Table.Cell key={i}>{contents}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
          {children}
        </Table.Body>
      </Table>
    </Segment>
  );
};
