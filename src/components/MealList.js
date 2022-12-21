import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";

function MealList({ items }) {
  function renderMealItem(itemData) {
    return (
      <MealItem
        id={itemData.item.id}
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        duration={itemData.item.duration}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealList;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
