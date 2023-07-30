import { FC } from 'react';
import { Button, Text } from 'react-native-paper';

import { CenteredContent } from '../CenteredContent';

export const TeamBoard: FC<{
  players: [string, string];
  points: number;
  handleAddPoint: () => void;
  servingPlayer: false | string;
  color: string;
}> = ({ players, points, handleAddPoint, servingPlayer, color }) => {
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
      {servingPlayer && <Text variant="displaySmall">{servingPlayer} is serving</Text>}
    </CenteredContent>
  );
};
