import { FC } from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native-paper';

import { GameProps, Ordinal } from '../App';
import { useAppTheme } from '../theme';
import { CenteredContent } from './CenteredContent';
import { UsernameInput } from './UsernameInput';

function shuffle(a: Array<string>): string[] {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const RandomSetup: FC<GameProps> = ({
  usernames,
  setUsername,
  usernameErrors,
  startGame,
}) => {
  const { colors } = useAppTheme();
  return (
    <>
      <CenteredContent>
        <Text variant="headlineLarge">Enter usernames:</Text>
        {usernames.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={i as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i]}
            isRandom
          />
        ))}
      </CenteredContent>
      <Button
        title="Draw Teams!"
        onPress={() => {
          const random = shuffle([...usernames]);
          startGame({
            red: random.slice(0, 2) as [string, string],
            blue: random.slice(2) as [string, string],
          });
        }}
        color={colors.green}
      />
    </>
  );
};
