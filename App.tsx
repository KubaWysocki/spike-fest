import { Dispatch, FC, useReducer, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { Game } from './components/Game/Game';
import { CustomSetup } from './components/Setups/CustomSetup';
import { RandomSetup } from './components/Setups/RandomSetup';
import { Start } from './components/Start';
import { theme } from './theme';

export type RootStackParamList = {
  Start: undefined;
  'Random Setup': undefined;
  'Custom Setup': undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Usernames = [string, string, string, string];
type UsernameErrors = [boolean, boolean, boolean, boolean];

const initialUsernames: Usernames = ['', '', '', ''];
const initialUsernameErrors: UsernameErrors = [false, false, false, false];

export type GameProps = {
  usernames: Usernames;
  usernameErrors: UsernameErrors;
  setUsername: Dispatch<UsernameAction>;
  startGame: (teams: Teams) => void;
};

export type Ordinal = 0 | 1 | 2 | 3;

export type UsernameAction = { ordinal: Ordinal; username: string };

function usernameReducer(state: Usernames, action: UsernameAction | null): Usernames {
  if (action === null) {
    return initialUsernames;
  }
  const users: Usernames = [...state];
  users[action.ordinal] = action.username;
  return users;
}

export type Teams = {
  red: [string, string];
  blue: [string, string];
};

const App: FC = () => {
  const [usernames, setUsername] = useReducer(usernameReducer, initialUsernames);

  const [usernameErrors, setUsernameErrors] = useState<UsernameErrors>(
    new Array(4).fill(false) as UsernameErrors,
  );

  const [teams, setTeams] = useState<Teams>();

  const startGame = (
    navigation: NativeStackNavigationProp<RootStackParamList>,
    teams: Teams,
  ): void => {
    setUsernameErrors(usernames.map((name) => name === '') as UsernameErrors);
    if (usernames.every((name) => !!name)) {
      setTeams(teams);
      navigation.navigate('Game');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        onStateChange={(state) => {
          if (state?.index === 0) {
            setUsername(null);
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
                usernames={usernames}
                setUsername={setUsername}
                startGame={(teams) => startGame(navigation, teams)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Custom Setup">
            {({ navigation }) => (
              <CustomSetup
                usernameErrors={usernameErrors}
                usernames={usernames}
                setUsername={setUsername}
                startGame={(teams) => startGame(navigation, teams)}
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
