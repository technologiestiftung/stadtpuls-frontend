/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Box, Link, Heading } from "theme-ui";
import { ApiTableType } from "../../common/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
              <tr key={entry.name} sx={{ "& > td": { fontSize: 0, py: 2 } }}>
                <td>{entry.name}</td>
                <td sx={{ px: 1, bg: "muted", fontFamily: "monospace" }}>
                  <Link
                    href={`${API_URL}/api/devices/${entry.id}/records`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    /api/devices/{entry.id}/records
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
