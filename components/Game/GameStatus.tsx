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
      style={{
        zIndex: 1,
        height,
        backgroundColor: servingTeam ? colors[servingTeam] : colors.gray,
      }}
    >
      {!servingTeam ? (
        <Animatable.View animation="fadeIn">
          <Text variant="displayMedium" style={textStyle}>
            Serve Point
          </Text>
        </Animatable.View>
      ) : (
        <>
          {winner ? (
            <Animatable.View animation="fadeIn">
              <Text variant="displayLarge" style={textStyle}>
                Team {winner} wins!
              </Text>
            </Animatable.View>
          ) : (
            rotation && (
              <Animatable.View
                duration={400}
                animation={{
                  from: { opacity: 0, translateY: servingTeam === 'red' ? -40 : 40 },
                  to: { opacity: 1, translateY: servingTeam === 'red' ? -10 : 10 },
                }}
                style={{ height, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
              >
                <Text variant="headlineMedium" style={textStyle}>
                  Rotation 🔄
                </Text>
              </Animatable.View>
            )
          )}
        </>
      )}
    </Animatable.View>
  );
};
