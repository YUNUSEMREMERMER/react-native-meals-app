import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../context/favorites";

function MealDetailScreen({ route, navigation }) {
  const id = route.params.mealId;

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const selectedMeal = MEALS.find((meal) => meal.id === id);

  const mealIsFavorite = favoriteMealIds.includes(id);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: id }));
    } else {
      dispatch(addFavorite({ id: id }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="star"
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <View>
      <ScrollView>
        <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
        />
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Ingredients</Text>
        </View>

        {selectedMeal.ingredients.map((ingredident) => (
          <Text style={styles.listItem} key={ingredident}>
            {ingredident}
          </Text>
        ))}
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Steps</Text>
        </View>
        {selectedMeal.steps.map((step) => (
          <Text style={styles.listItem} key={step}>
            {step}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },
  subTitleContainer: {
    borderBottomColor: "#24180f",
    borderBottomWidth: 2,
    marginVertical: 4,
    marginHorizontal: 24,
    padding: 6,
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginVertical: 4,
    textAlign: "center",
  },
});
export default MealDetailScreen;
