import { Link } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎来到 Todo 应用！</Text>
      <Link href="/todo" asChild>
        <Button title="进入 Todo 主界面" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
});
