/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Box, Link, Heading } from "theme-ui";

interface ApiEntryType {
  label: string;
  domain: string;
  route: string;
}
export interface ApiTableType {
  entries: ApiEntryType[];
}

export const ApiInfo: React.FC<ApiTableType> = ({ entries }) => {
  return (
    <Box>
      <Heading as='h2' variant='h4'>
        API
      </Heading>
      <table sx={{ width: "100%", mt: 2 }}>
        <tbody>
          {entries.map(entry => {
            return (
              <tr key={entry.label} sx={{ "& > td": { fontSize: 0, py: 2 } }}>
                <td>{entry.label}</td>
                <td sx={{ px: 1, bg: "muted", fontFamily: "monospace" }}>
                  <Link
                    href={`${entry.domain}/${entry.route}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    /{entry.route}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};
