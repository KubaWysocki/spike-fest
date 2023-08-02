import { FC } from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native-paper';

import { GameProps, Ordinal } from '../../App';
import { useAppTheme } from '../../theme';
import { CenteredContent } from '../design/CenteredContent';
import { UsernameInput } from '../design/UsernameInput';

export const CustomSetup: FC<GameProps> = ({
  usernames,
  setUsername,
  startGame,
  usernameErrors,
}) => {
  const { colors } = useAppTheme();
  const red = usernames.slice(0, 2) as [string, string];
  const blue = usernames.slice(2) as [string, string];

  return (
    <>
      <CenteredContent backgroundColor={colors.red}>
        <Text variant="headlineLarge">Enter usernames:</Text>
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
      <CenteredContent backgroundColor={colors.blue}>
        <Text variant="headlineLarge">Enter usernames:</Text>
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
