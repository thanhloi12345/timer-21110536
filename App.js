import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ListLap from './components/ListLap';
import { useEffect, useRef, useState } from 'react';
import formatTime from "minutes-seconds-milliseconds";
export default function App() {

  const [timeElapsed, setTimeElapsed] = useState(null);
  const [isRun, setIsRun] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const lapsIntervalRef = useRef(null);
  const [numberIncre, setNumberInsce] = useState(0);

  const onStart = () => {
    setIsRun(true);
    const startTime = new Date();
    onSetDefault();
    intervalRef.current = setInterval(() => {
      setTimeElapsed(new Date() - startTime);
    }, 100);
  }

  const onStop = () => {
    clearInterval(intervalRef.current);
    clearInterval(lapsIntervalRef.current);
    const newLaps = laps.map((item) => item.isCurrentTime === true ? { isCurrentTime: false, timeElapsed: item.timeElapsed, number: item.number } : item);
    console.log(newLaps);
    setLaps(newLaps);
    setIsRun(false);
  }
  const onSetLaps = () => {
    clearInterval(lapsIntervalRef.current);
    const startTime = new Date();
    lapsIntervalRef.current = setInterval(() => {
      const newLaps = laps.map((item) => item.isCurrentTime === true ? { isCurrentTime: item.isCurrentTime, timeElapsed: (new Date() - startTime), number: item.number } : item);
      setLaps(newLaps);
    }, 100);

  }
  const onSetDefault = () => {
    clearInterval(lapsIntervalRef.current);
    const number = numberIncre + 1;
    setNumberInsce(number);
    const startTime = new Date();
    lapsIntervalRef.current = setInterval(() => {
      const item = { timeElapsed: (new Date() - startTime), isCurrentTime: true, number: number };
      setLaps([...laps, item]);

    }, 100);
  }
  const onReset = () => {
    setNumberInsce(0);
    setLaps([])
  }

  return (
    <View className="flex-1 bg-[#121212] px-4">
      <View className="items-center mt-40">
        <Text className="text-[80px] font-light text-white">{!!timeElapsed ? formatTime(timeElapsed) : "00:00,00"}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-20">
        {!isRun && laps.length > 0 ? <Button label={"Reset"} onPress={onReset} color={"#340e0d"} /> : <Button label={"Lap"} onPress={() => { onSetLaps(); onSetDefault() }} color={"#1c1b1d"} />}


        {isRun ? <Button label={"Stop"} onPress={onStop} colorRing={"red"} color={"#340e0d"} /> : <Button color={"#092910"} label={"Start"} onPress={onStart} colorRing={"green"} />}

      </View>

      <View>
        <ListLap laps={laps} currentTime={timeElapsed} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


