import { FC } from 'react';

import { GameProps, Ordinal, Player } from '../../App';
import { CenteredContent } from '../design/CenteredContent';
import { EnterUsernamesHeading } from '../design/EnterUsernamesHeading';
import { PlayerInput } from '../design/PlayerInput';
import { StartButton } from '../design/StartButton';

function shuffle(a: Array<Player>): Player[] {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const RandomSetup: FC<GameProps> = ({ players, setPlayers, usernameErrors, startGame }) => {
  return (
    <>
      <CenteredContent>
        <EnterUsernamesHeading />
        {players.map((player, i) => (
          <PlayerInput
            key={i}
            ordinal={i as Ordinal}
            value={player}
            setPlayer={setPlayers}
            error={usernameErrors[i]}
          />
        ))}
      </CenteredContent>
      <StartButton
        onPress={() => {
          const random = shuffle([...players]);
          startGame({
            red: random.slice(0, 2) as [Player, Player],
            blue: random.slice(2) as [Player, Player],
          });
        }}
      />
    </>
  );
};
