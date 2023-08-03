import { Dispatch, FC } from 'react';
import { HelperText, TextInput } from 'react-native-paper';

import { UsernameAction } from '../../App';
import { useAppTheme } from './theme';

export const UsernameInput: FC<{
  value: string;
  ordinal: 0 | 1 | 2 | 3;
  setUsername: Dispatch<UsernameAction>;
  error: boolean;
}> = ({ value, ordinal, setUsername, error }) => {
  const { colors } = useAppTheme();
  return (
    <>
      <TextInput
        dense
        label={`Player ${ordinal + 1}`}
        style={{ width: '80%', margin: 6, backgroundColor: colors.gray }}
        textColor={colors.onSurface}
        value={value}
        onChangeText={(username) => setUsername({ username, ordinal })}
        error={error}
      />
      <HelperText
        type="error"
        visible={error}
        style={{ color: colors.onSurface, lineHeight: 8, height: 14 }}
      >
        Please enter username
      </HelperText>
    </>
  );
};
