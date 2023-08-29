import { Dispatch, FC } from 'react';
import { HelperText, TextInput } from 'react-native-paper';

import { Ordinal, Player, PlayerAction } from '../../App';
import { useAppTheme } from './theme';

export const PlayerInput: FC<{
  value: Player;
  ordinal: Ordinal;
  setPlayer: Dispatch<PlayerAction>;
  error: boolean;
  setCamera: Dispatch<Ordinal>;
}> = ({ value, ordinal, setPlayer, error, setCamera }) => {
  const { colors } = useAppTheme();

  return (
    <>
      <TextInput
        dense
        label={`Player ${ordinal + 1}`}
        style={{ width: '80%', margin: 6, backgroundColor: colors.gray }}
        textColor={colors.onSurface}
        value={value.name}
        onChangeText={(name) => setPlayer({ type: 'username', name, ordinal })}
        error={error}
        right={
          <TextInput.Icon
            icon="camera"
            size={20}
            onPress={() => setCamera(ordinal)}
            color={value.photo ? 'green' : undefined}
          />
        }
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
