import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const Button = ({ label, onPress, colorRing, disabled, color }) => {
    return (
        <View className="w-24 h-24 rounded-full border-2 justify-center items-center p-1" style={{
            borderColor: color
        }}>
            <Pressable className={`w-full h-full rounded-full justify-center items-center`} style={{
                backgroundColor: color,
            }} onPress={onPress} disabled={!!disabled}>
                <Text className="text-white">{label}</Text>
            </Pressable>
        </View>

    )
}

export default Button