// TodoList.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <Text style={styles.empty}>暂无任务</Text>;
  }
  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.checkbox}>
            <Text style={[styles.checkboxText, item.completed && styles.checked]}>✓</Text>
          </TouchableOpacity>
          <Text style={[styles.itemText, item.completed && styles.completed]}>{item.text}</Text>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Text style={styles.delete}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { color: '#aaa', textAlign: 'center', marginTop: 40, fontSize: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  checkbox: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkboxText: { color: '#2563eb', fontSize: 18 },
  checked: { color: '#2563eb', opacity: 0.5 },
  itemText: { flex: 1, fontSize: 16, color: '#333' },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  delete: { color: '#f43f5e', fontSize: 20, marginLeft: 10 },
});
