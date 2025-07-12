import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

// 类型声明
interface Project {
  id: number;
  name: string;
}
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  projectId: number;
}

const screenWidth = Dimensions.get('window').width;
// AsyncStorage 存储键名，用于区分不同类型的数据
const PROJECTS_KEY = 'mytodo-projects';
const TODOS_KEY = 'mytodo-todos';

export default function TodoPage() {
  const [projects, setProjects] = useState<Project[]>([{ id: 1, name: 'Today' }]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(true);

  // ===== 本地存储数据加载逻辑 =====
  // 组件初始化时，从 AsyncStorage 加载之前保存的项目和任务数据
  useEffect(() => {
    const loadData = async () => {
      try {
        // 从本地存储读取项目数据
        const projectsStr = await AsyncStorage.getItem(PROJECTS_KEY);
        // 从本地存储读取任务数据
        const todosStr = await AsyncStorage.getItem(TODOS_KEY);
        
        // 如果存在项目数据，则恢复项目列表
        if (projectsStr) setProjects(JSON.parse(projectsStr));
        // 如果存在任务数据，则恢复任务列表
        if (todosStr) setTodos(JSON.parse(todosStr));
      } catch (e) {
        // 读取失败时忽略错误，使用默认数据
      }
      // 数据加载完成，关闭加载状态
      setLoading(false);
    };
    loadData();
  }, []);

  // ===== 项目选择同步逻辑 =====
  // 当项目列表发生变化时，确保当前选中的项目ID仍然有效
  useEffect(() => {
    // 如果项目列表不为空，但当前选中的项目ID在列表中不存在
    if (projects.length > 0 && !projects.find(p => p.id === selectedProjectId)) {
      // 自动选择第一个项目作为当前项目
      setSelectedProjectId(projects[0].id);
    }
  }, [projects]);

  // ===== 项目数据持久化 =====
  // 当项目列表发生变化时，自动保存到本地存储
  useEffect(() => {
    AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  // ===== 项目操作 =====
  // 添加新项目
  const addProject = () => {
    if (!newProjectName.trim()) return;
    if (projects.some(p => p.name === newProjectName)) return;
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { id: newId, name: newProjectName }]);
    setNewProjectName('');
  };

  // ===== 任务操作（带立即持久化） =====
  // 添加新任务 - 立即保存到本地存储，确保数据不丢失
  const addTodo = async () => {
    if (!newTodoText.trim() || !selectedProjectId) return;
    
    // 创建新的任务列表，包含新任务
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        text: newTodoText,
        completed: false,
        projectId: selectedProjectId,
      },
    ];
    
    // 更新状态
    setTodos(newTodos);
    setNewTodoText('');
    
    // 立即保存到本地存储，确保数据持久化
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
  };

  // 切换任务完成状态 - 立即保存到本地存储
  const toggleTodo = async (id: number) => {
    // 创建新的任务列表，切换指定任务的完成状态
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    // 更新状态
    setTodos(newTodos);
    
    // 立即保存到本地存储
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
  };

  // 删除任务 - 立即保存到本地存储
  const deleteTodo = async (id: number) => {
    // 创建新的任务列表，过滤掉要删除的任务
    const newTodos = todos.filter(todo => todo.id !== id);
    
    // 更新状态
    setTodos(newTodos);
    
    // 立即保存到本地存储
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
  };

  // 过滤当前项目下的任务
  const currentProjectTodos = todos.filter(todo => todo.projectId === selectedProjectId);

  // 显示加载状态
  if (loading) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>加载中...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {/* 顶部项目列表 横向滚动 */}
      <View style={styles.projectBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.projectScroll}>
          {projects.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.projectBtn, selectedProjectId === item.id && styles.projectBtnActive]}
              onPress={() => setSelectedProjectId(item.id)}
            >
              <Text style={selectedProjectId === item.id ? styles.projectTextActive : styles.projectText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
          {/* 添加项目输入和按钮 */}
          <View style={styles.addProjectInline}>
            <TextInput
              style={styles.projectInput}
              value={newProjectName}
              onChangeText={setNewProjectName}
              placeholder="新项目"
              onSubmitEditing={addProject}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addProjectBtn} onPress={addProject}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>＋</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* 任务区 */}
      <View style={styles.main}>
        <Text style={styles.mainTitle}>
          {projects.find(p => p.id === selectedProjectId)?.name || '未选择项目'}
        </Text>
        <TodoInput
          value={newTodoText}
          onChange={setNewTodoText}
          onAdd={addTodo}
          placeholder="请输入任务内容"
          buttonText="添加任务"
        />
        <View style={styles.todoListWrapper}>
          <TodoList
            todos={currentProjectTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  projectBar: {
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  projectScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  projectBtn: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#e0e7ef',
    marginRight: 8,
  },
  projectBtnActive: {
    backgroundColor: '#2563eb',
  },
  projectText: {
    color: '#333',
    fontSize: 15,
  },
  projectTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addProjectInline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 4,
    paddingRight: 2,
    height: 36,
  },
  projectInput: {
    width: 80,
    paddingVertical: 0,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  addProjectBtn: {
    marginLeft: 2,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  main: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  todoListWrapper: {
    flex: 1,
    marginTop: 8,
  },
});
