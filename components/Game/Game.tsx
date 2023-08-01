import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, Teams } from '../../App';
import { useAppTheme } from '../../theme';
import { TeamBoard } from './TeamBoard';

type TeamNames = keyof Teams;

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

  const { colors } = useAppTheme();

  const [servingTeam, setServingTeam] = useState<TeamNames>();
  const [rotation, setRotation] = useState(false);
  const [points, setPoints] = useState({
    red: 0,
    blue: 0,
  });
  const [servingPlayer, setServingPlayer] = useState({
    red: Math.round(Math.random()),
    blue: Math.round(Math.random()),
  });

  const winner = useMemo(() => {
    if (points.red >= 21 || points.blue >= 21) {
      if (Math.abs(points.red - points.blue) > 1) {
        return points.red > points.blue ? 'red' : 'blue';
      }
    }
  }, [points]);

  const handleAddPoint = useCallback(
    (scoredTeam: TeamNames) => () => {
      if (winner) {
        return;
      }

      if (!servingTeam) {
        return setServingTeam(scoredTeam);
      }

      setServingTeam(scoredTeam);
      setPoints((points) => ({
        ...points,
        [scoredTeam]: points[scoredTeam] + 1,
      }));

      if (scoredTeam !== servingTeam) {
        setRotation(false);
        setServingPlayer((servingPlayer) => ({
          ...servingPlayer,
          [scoredTeam]: Math.abs(servingPlayer[scoredTeam] - 1),
        }));
      } else {
        setRotation(true);
      }
    },
    [servingTeam, winner],
  );

  const sharedBannersStyle = {
    textAlign: 'center',
    backgroundColor: colors[servingTeam || 'red'],
  } as const;

  return (
    <>
      <TeamBoard
        players={teams.red}
        points={points.red}
        handleAddPoint={handleAddPoint('red')}
        servingPlayer={!winner && servingTeam === 'red' && teams.red[servingPlayer.red]}
        color={colors.red}
      />
      {!servingTeam ? (
        <Text variant="displayMedium" style={{ textAlign: 'center' }}>
          Serve Point
        </Text>
      ) : (
        <>
          {winner ? (
            <Text variant="displayLarge" style={sharedBannersStyle}>
              Team {winner} wins!
            </Text>
          ) : (
            rotation && (
              <Text variant="headlineMedium" style={sharedBannersStyle}>
                Rotation 🔄
              </Text>
            )
          )}
        </>
      )}
      <TeamBoard
        players={teams.blue}
        points={points.blue}
        handleAddPoint={handleAddPoint('blue')}
        servingPlayer={!winner && servingTeam === 'blue' && teams.blue[servingPlayer.blue]}
        color={colors.blue}
      />
    </>
  );
};
