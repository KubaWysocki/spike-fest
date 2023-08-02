import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

export const CenteredContent: FC<PropsWithChildren<{ backgroundColor?: string }>> = ({
  children,
  backgroundColor = 'white',
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
};
