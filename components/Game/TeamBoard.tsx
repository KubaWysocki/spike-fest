import { FC, ReactNode } from 'react';
import { Button, Text } from 'react-native-paper';

import { CenteredContent } from '../CenteredContent';

export const TeamBoard: FC<{
  players: [string, string];
  points: number;
  handleAddPoint: () => void;
  quarterback: ReactNode;
  color: string;
}> = ({ players, points, handleAddPoint, quarterback, color }) => {
  return (
    <CenteredContent backgroundColor={color}>
      <Text variant="headlineLarge">
        {players[0]} & {players[1]}
      </Text>
      <Text variant="displayLarge">{points}</Text>
      <Button
        onPress={handleAddPoint}
        labelStyle={{ fontSize: 80, lineHeight: 80, width: 80, color: 'white' }}
      >
        +
      </Button>
      {quarterback}
    </CenteredContent>
  );
};
