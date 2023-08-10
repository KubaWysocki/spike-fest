import { FC } from 'react';

import { GameProps, Ordinal, Player } from '../../App';
import { CenteredContent } from '../design/CenteredContent';
import { EnterUsernamesHeading } from '../design/EnterUsernamesHeading';
import { PlayerInput } from '../design/PlayerInput';
import { StartButton } from '../design/StartButton';
import { useAppTheme } from '../design/theme';

export const CustomSetup: FC<GameProps> = ({ players, setPlayers, startGame, usernameErrors }) => {
  const { colors } = useAppTheme();
  const redTeam = players.slice(0, 2) as [Player, Player];
  const blueTeam = players.slice(2) as [Player, Player];

  return (
    <>
      <CenteredContent backgroundColor={colors.red}>
        <EnterUsernamesHeading />
        {redTeam.map((player, i) => (
          <PlayerInput
            key={i}
            ordinal={i as Ordinal}
            value={player}
            setPlayer={setPlayers}
            error={usernameErrors[i]}
          />
        ))}
      </CenteredContent>
      <CenteredContent backgroundColor={colors.blue}>
        <EnterUsernamesHeading />
        {blueTeam.map((player, i) => (
          <PlayerInput
            key={i}
            ordinal={(i + 2) as Ordinal}
            value={player}
            setPlayer={setPlayers}
            error={usernameErrors[i + 2]}
          />
        ))}
      </CenteredContent>
      <StartButton onPress={() => startGame({ red: redTeam, blue: blueTeam })} />
    </>
  );
};
