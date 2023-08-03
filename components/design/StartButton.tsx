import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export const StartButton: FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={{ backgroundColor: 'green', padding: '2%' }}
  >
    <Text variant="headlineLarge" style={{ textAlign: 'center', color: 'white' }}>
      Start Game
    </Text>
  </TouchableOpacity>
);
