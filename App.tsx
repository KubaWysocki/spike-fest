import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Dispatch, FC, useReducer, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import { CameraCapturedPicture } from 'expo-camera';

import { PlayerCamera } from './components/design/Camera';
import { theme } from './components/design/theme';
import { Game } from './components/Game/Game';
import { CustomSetup } from './components/Setups/CustomSetup';
import { RandomSetup } from './components/Setups/RandomSetup';
import { Start } from './components/Start';

export type RootStackParamList = {
  Start: undefined;
  'Random Setup': undefined;
  'Custom Setup': undefined;
  Game: undefined;
  'Player Camera': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type Player = {
  name: string;
  photo?: CameraCapturedPicture;
};

type Players = [Player, Player, Player, Player];
type UsernameErrors = [boolean, boolean, boolean, boolean];

const initialPlayers: Players = [{ name: '' }, { name: '' }, { name: '' }, { name: '' }];
const initialUsernameErrors: UsernameErrors = [false, false, false, false];

export type GameProps = {
  players: Players;
  usernameErrors: UsernameErrors;
  setPlayers: Dispatch<PlayerAction>;
  startGame: (teams: Teams) => void;
  setCamera: (ordinal: Ordinal) => void;
};

export type Ordinal = 0 | 1 | 2 | 3;

export type PlayerAction = { ordinal: Ordinal } & (
  | { type: 'username'; name: string }
  | { type: 'photo'; photo: CameraCapturedPicture }
);

function teamsReducer(state: Players, action: PlayerAction | null): Players {
  if (action === null) {
    return initialPlayers;
  }
  if (action.type === 'username') {
    const players: Players = [...state];
    players[action.ordinal] = { ...players[action.ordinal], name: action.name };
    return players;
  } else {
    const players: Players = [...state];
    players[action.ordinal] = { ...players[action.ordinal], photo: action.photo };
    return players;
  }
}

export type Teams = {
  red: [Player, Player];
  blue: [Player, Player];
};

const App: FC = () => {
  const [players, setPlayers] = useReducer(teamsReducer, initialPlayers);
  const [usernameErrors, setUsernameErrors] = useState<UsernameErrors>(
    new Array(4).fill(false) as UsernameErrors,
  );
  const [playerCamera, setPlayerCamera] = useState<Ordinal>();

  const [teams, setTeams] = useState<Teams>();

  const startGame = (
    navigation: NativeStackNavigationProp<RootStackParamList>,
    teams: Teams,
  ): void => {
    setUsernameErrors(players.map(({ name }) => name === '') as UsernameErrors);
    if (players.every(({ name }) => !!name)) {
      setTeams(teams);
      navigation.navigate('Game');
    }
  };

  const handleCamera = (
    ordinal: Ordinal,
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ): void => {
    setPlayerCamera(ordinal);
    navigation.navigate('Player Camera');
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        onStateChange={(state) => {
          if (state?.index === 0) {
            setPlayers(null);
            setUsernameErrors(initialUsernameErrors);
          }
        }}
      >
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="Random Setup">
            {({ navigation }) => (
              <RandomSetup
                usernameErrors={usernameErrors}
                players={players}
                setPlayers={setPlayers}
                startGame={(teams) => startGame(navigation, teams)}
                setCamera={(ordinal) => handleCamera(ordinal, navigation)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Custom Setup">
            {({ navigation }) => (
              <CustomSetup
                usernameErrors={usernameErrors}
                players={players}
                setPlayers={setPlayers}
                startGame={(teams) => startGame(navigation, teams)}
                setCamera={(ordinal) => handleCamera(ordinal, navigation)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Player Camera">
            {({ navigation }) => (
              <PlayerCamera
                onBack={() => navigation.goBack()}
                setPhoto={(photo) => {
                  if (playerCamera !== undefined) {
                    setPlayers({ photo, type: 'photo', ordinal: playerCamera });
                    setPlayerCamera(undefined);
                  }
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Game" options={{ headerShown: false }}>
            {(props) => <Game {...props} teams={teams as Teams} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
