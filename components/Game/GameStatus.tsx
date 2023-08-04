import { FC, useEffect, useRef } from 'react';
import { View } from 'react-native';
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

  const firstRotationRef = useRef(false);
  const animatableRotationRef = useRef<Animatable.View & View>(null);
  useEffect(() => {
    if (firstRotationRef.current) {
      animatableRotationRef.current?.shake?.(1600);
    }
    if (rotation) {
      firstRotationRef.current = true;
    } else {
      firstRotationRef.current = false;
    }
  });

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
                ref={animatableRotationRef}
                duration={400}
                animation={{
                  from: { opacity: 0, translateY: servingTeam === 'red' ? -30 : 30 },
                  to: { opacity: 1, translateY: 0 },
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
