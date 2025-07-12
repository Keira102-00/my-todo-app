// TodoInput.jsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TodoInput({ value, onChange, onAdd, placeholder, buttonText }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.btn} onPress={onAdd}>
        <Text style={styles.btnText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#fff' },
  btn: { marginLeft: 8, backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});