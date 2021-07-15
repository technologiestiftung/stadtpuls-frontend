import { FC } from "react";
interface ApiEntryType {
  label: string;
  domain: string;
  route: string;
}
export interface ApiTableType {
  entries: ApiEntryType[];
}

export const ApiInfo: FC<ApiTableType> = ({ entries }) => {
  return (
    <div>
      <h2 className='text-xl md:text-3xl text-purple font-headline'>API</h2>
      <table className='w-full mt-2'>
        <tbody>
          {entries.map(entry => {
            return (
              <tr key={entry.label}>
                <td className='py-2 text-sm'>{entry.label}</td>
                <td className='py-2 px-1 text-sm'>
                  <a
                    href={`${entry.domain}/${entry.route}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue hover:text-purple transition-colors'
                  >
                    /{entry.route}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
