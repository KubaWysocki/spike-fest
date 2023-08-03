import { FC } from 'react';

import { GameProps, Ordinal } from '../../App';
import { CenteredContent } from '../design/CenteredContent';
import { EnterUsernamesHeading } from '../design/EnterUsernamesHeading';
import { StartButton } from '../design/StartButton';
import { UsernameInput } from '../design/UsernameInput';

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
  return (
    <>
      <CenteredContent>
        <EnterUsernamesHeading />
        {usernames.map((user, i) => (
          <UsernameInput
            key={i}
            ordinal={i as Ordinal}
            value={user}
            setUsername={setUsername}
            error={usernameErrors[i]}
          />
        ))}
      </CenteredContent>
      <StartButton
        onPress={() => {
          const random = shuffle([...usernames]);
          startGame({
            red: random.slice(0, 2) as [string, string],
            blue: random.slice(2) as [string, string],
          });
        }}
      />
    </>
  );
};
