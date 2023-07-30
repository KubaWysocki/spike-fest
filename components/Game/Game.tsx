import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, Teams } from '../../App';
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

  const handleAddPoint = useCallback(
    (scoredTeam: TeamNames) => () => {
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
    [servingTeam],
  );

  const teamData = useMemo(() => {
    return {
      red: {
        players: teams.red,
        points: points.red,
        handleAddPoint: handleAddPoint('red'),
        servingPlayer: servingTeam === 'red' && teams.red[servingPlayer.red],
        color: '#EE6258',
      },
      blue: {
        players: teams.blue,
        points: points.blue,
        handleAddPoint: handleAddPoint('blue'),
        servingPlayer: servingTeam === 'blue' && teams.blue[servingPlayer.blue],
        color: '#A6D4F2',
      },
    };
  }, [teams, points, handleAddPoint, servingPlayer, servingTeam]);

  return (
    <>
      <TeamBoard {...teamData.red} />
      {!servingTeam ? (
        <Text variant="displayMedium" style={styles.servePoint}>
          Serve Point
        </Text>
      ) : (
        rotation && (
          <Text
            variant="headlineMedium"
            style={{ textAlign: 'center', backgroundColor: teamData[servingTeam].color }}
          >
            Rotation 🔄
          </Text>
        )
      )}
      <TeamBoard {...teamData.blue} />
    </>
  );
};

const styles = StyleSheet.create({
  servePoint: { textAlign: 'center' },
});
