import { FC, useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-paper';

export const Quarterback: FC<{ player: false | string }> = ({ player }) => {
  const [quarterback, setQuarterback] = useState(player);

  useEffect(() => {
    if (player) {
      setQuarterback(player);
    }
  }, [player]);

  return (
    <Animatable.View transition="opacity" style={{ opacity: player ? 1 : 0 }}>
      <Text variant="displaySmall">{quarterback} is serving</Text>
    </Animatable.View>
  );
};
