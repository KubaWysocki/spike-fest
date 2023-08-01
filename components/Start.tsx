import { FC } from 'react';
import { Image } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { useAppTheme } from '../theme';
import { CenteredContent } from './CenteredContent';

export const Start: FC<NativeStackScreenProps<RootStackParamList, 'Start'>> = ({ navigation }) => {
  const { colors } = useAppTheme();
  return (
    <CenteredContent>
      <Text variant="displayLarge">SpikeFest</Text>
      <Image
        source={require('../assets/spikeball-logo.png')}
        style={{
          resizeMode: 'cover',
          height: 300,
          width: 300,
        }}
      />
      <Button
        mode="contained"
        buttonColor={colors.darkBlue}
        onPress={() => navigation.navigate('Random Setup')}
      >
        Random Game!
      </Button>
      <Button
        mode="contained-tonal"
        buttonColor={colors.blue}
        onPress={() => navigation.navigate('Custom Setup')}
        style={{ marginTop: '10%' }}
      >
        Custom Game!
      </Button>
    </CenteredContent>
  );
};
