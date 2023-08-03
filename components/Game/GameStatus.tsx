import { FC } from 'react';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../design/theme';
import { TeamNames } from './Game';

export const GameStatus: FC<{
  servingTeam: TeamNames | undefined;
  winner: TeamNames | undefined;
  rotation: boolean;
}> = ({ servingTeam, winner, rotation }) => {
  const { colors } = useAppTheme();

  const textStyle = { textAlign: 'center' } as const;

  let height = 0;
  if (!servingTeam) height = 52;
  else if (winner) height = 64;
  else if (rotation) height = 36;

  return (
    <Animatable.View
      transition={['height', 'backgroundColor']}
      style={{ height, backgroundColor: servingTeam ? colors[servingTeam] : '#fff' }}
    >
      {!servingTeam ? (
        <Text variant="displayMedium" style={textStyle}>
          Serve Point
        </Text>
      ) : (
        <>
          {winner ? (
            <Text variant="displayLarge" style={textStyle}>
              Team {winner} wins!
            </Text>
          ) : (
            rotation && (
              <Text variant="headlineMedium" style={textStyle}>
                Rotation 🔄
              </Text>
            )
          )}
        </>
      )}
    </Animatable.View>
  );
};
