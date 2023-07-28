import { FC, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, Teams } from '../App';
import { CenteredContent } from './CenteredContent';

export const Game: FC<NativeStackScreenProps<RootStackParamList, 'Game'> & { teams: Teams }> = ({
  teams,
  navigation,
}) => {
  useEffect(() => {
    const backAction = (): true => {
      Alert.alert('Hold on!', 'Are you sure you want to discard the game?', [
        { text: 'Cancel', onPress: () => null, style: 'destructive' },
        { text: 'YES', onPress: () => navigation.navigate('Start') },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <CenteredContent>
      <Text>
        Red: {teams.red[0]}, {teams.red[1]}
      </Text>
      <Text>
        Blue: {teams.blue[0]}, {teams.blue[1]}
      </Text>
    </CenteredContent>
  );
};
