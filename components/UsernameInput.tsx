import { Dispatch, FC } from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { UsernameAction } from '../App';

export const UsernameInput: FC<{
  value: string;
  ordinal: 0 | 1 | 2 | 3;
  setUsername: Dispatch<UsernameAction>;
  error: boolean;
  isRandom?: true;
}> = ({ value, ordinal, setUsername, error, isRandom }) => {
  return (
    <>
      <TextInput
        mode="outlined"
        label={`Player ${ordinal + 1}`}
        style={{ width: '80%', margin: 10 }}
        value={value}
        onChangeText={(username) => setUsername({ username, ordinal })}
        error={error}
      />
      {error && (
        <Text style={{ color: isRandom ? 'black' : 'white', lineHeight: 14 }}>
          Please enter username
        </Text>
      )}
    </>
  );
};
