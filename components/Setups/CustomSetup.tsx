import { FC } from 'react';

import { GameProps, Ordinal } from '../../App';
import { CenteredContent } from '../design/CenteredContent';
import { EnterUsernamesHeading } from '../design/EnterUsernamesHeading';
import { StartButton } from '../design/StartButton';
import { useAppTheme } from '../design/theme';
import { UsernameInput } from '../design/UsernameInput';

export const CustomSetup: FC<GameProps> = ({
  usernames,
  setUsername,
  startGame,
  usernameErrors,
}) => {
  const { colors } = useAppTheme();
  const redTeam = usernames.slice(0, 2) as [string, string];
  const blueTeam = usernames.slice(2) as [string, string];

  return (
    <>
      <CenteredContent backgroundColor={colors.red}>
        <EnterUsernamesHeading />
        {redTeam.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={i as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i]}
          />
        ))}
      </CenteredContent>
      <CenteredContent backgroundColor={colors.blue}>
        <EnterUsernamesHeading />
        {blueTeam.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={(i + 2) as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i + 2]}
          />
        ))}
      </CenteredContent>
      <StartButton onPress={() => startGame({ red: redTeam, blue: blueTeam })} />
    </>
  );
};
