import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import data from './src/data/data';
import RenderItem from './src/components/RenderItem';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f3f3f3" barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Animated Accordion</Text>
        <View style={styles.wrapListItem}>
          {data.map(item => (
            <RenderItem item={item} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2647',
  },
  wrapListItem: {
    marginVertical: 20,
  },
});

export default App;
