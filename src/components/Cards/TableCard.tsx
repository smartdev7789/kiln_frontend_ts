import React from "react";
import { Segment, Table } from "semantic-ui-react";

export type Row = {
  id: number;
  cellContents: (string | JSX.Element | JSX.Element[])[];
};

export type TableCardProps = {
  headers: string[];
  rows: Row[];
};

export const TableCard = ({ headers, rows }: TableCardProps) => {
  return (
    <Segment
      className="full-width no-padding borderless"
      style={{ height: "35em" }}
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
          {rows.map((row) => {
            return (
              <Table.Row key={row.id}>
                {row.cellContents.map((contents, i) => (
                  <Table.Cell key={i}>{contents}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
};
