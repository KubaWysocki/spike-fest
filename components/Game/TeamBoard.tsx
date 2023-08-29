import { FC, ReactNode } from 'react';
import { ImageBackground, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, Text } from 'react-native-paper';

import { CameraCapturedPicture } from 'expo-camera';

import { Player } from '../../App';
import { CenteredContent } from '../design/CenteredContent';

export const TeamBoard: FC<{
  players: [Player, Player];
  points: number;
  handleAddPoint: () => void;
  quarterback: ReactNode;
  color: string;
  playerImage: CameraCapturedPicture | false | undefined;
}> = ({ players, points, handleAddPoint, quarterback, color, playerImage }) => {
  const photoStyles = { width: 100, height: 100, margin: 5 };
  return (
    <CenteredContent backgroundColor={color}>
      <Text variant="headlineLarge">
        {players[0].name} & {players[1].name}
      </Text>
      <Text variant="displayLarge">{points}</Text>
      <Button
        onPress={handleAddPoint}
        labelStyle={{ fontSize: 80, lineHeight: 80, width: 80, color: 'white' }}
      >
        +
      </Button>
      <Animatable.View transition="opacity" style={{ opacity: playerImage ? 1 : 0 }}>
        {playerImage ? (
          <ImageBackground source={{ uri: playerImage.uri }} style={photoStyles} />
        ) : (
          <View style={photoStyles} />
        )}
      </Animatable.View>
      {quarterback}
    </CenteredContent>
  );
};
