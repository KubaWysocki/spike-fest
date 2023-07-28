import { FC } from 'react';
import { Button } from 'react-native';

import { GameProps, Ordinal } from '../App';
import { CenteredContent } from './CenteredContent';
import { UsernameInput } from './UsernameInput';

export const CustomSetup: FC<GameProps> = ({
  usernames,
  setUsername,
  startGame,
  usernameErrors,
}) => {
  const red = usernames.slice(0, 2) as [string, string];
  const blue = usernames.slice(2) as [string, string];

  return (
    <>
      <CenteredContent backgroundColor="red">
        {red.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={i as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i]}
          />
        ))}
      </CenteredContent>
      <CenteredContent backgroundColor="blue">
        {blue.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={(i + 2) as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i + 2]}
          />
        ))}
      </CenteredContent>
      <Button title="Start Game" onPress={() => startGame({ red, blue })} color="green" />
    </>
  );
};
