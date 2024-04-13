import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import formatTime from "minutes-seconds-milliseconds";
const ListLap = ({ laps, currentTime }) => {
    return (
        <ScrollView className="h-[45%] mt-6">

            <View className="flex-1 gap-y-2">
                {
                    laps.slice().sort((a, b) => b.timeElapsed - a.timeElapsed).map((item, id) => (
                        <View key={id} className="flex-row py-3 justify-between items-center border-b-[0.2px] border-b-neutral-300">
                            <Text className="text-xl text-white">Lap {item.number}</Text>
                            <Text className="text-xl text-white">{formatTime(item.timeElapsed)}</Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>



    )
}

export default ListLap