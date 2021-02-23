import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";

const Goals = (props) => {
  const [items, setItems] = useState([]);
  const [price, setItemPrice] = useState("");
  const [description, setItemDescription] = useState("");
  const [transactionId, setTransactionId] = useState(0);
  const addGoal = () => {
    const newItems = [
      ...items,
      {
        id: transactionId,
        price: price,
        description: description,
      },
    ];
    setItems(newItems);
    setTransactionId(transactionId + 1);
  };

  const getPercentageUntilGoal = (itemPrice) => {
    let percentage =
      parseFloat((props.totalBalance / itemPrice).toFixed(2)) * 100;

    if (percentage > 100) {
      return 100;
    }
    return percentage;
  };

  const removeGoal = (goalId) => {
    const newGoals = items.filter((item) => goalId !== item.id);
    setItems(newGoals);
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Purchase Goals</Text>
      {items.length == 0 && <Text>Saving up for an item? Add it here!</Text>}

      

      {/* <View style={styles.containerHeading}>
        <Text style={styles.numCol}>%</Text>
        <Text style={styles.textDescription}>Description</Text>
        <Text style={styles.textPrice}>Price</Text>
        <Text style={styles.xButtonContainer}></Text>
      </View> */}
      <View>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={
              getPercentageUntilGoal(item.price) < 100
                ? styles.containerNormal
                : styles.containerGreen
            }
          >
            <Text style={styles.numCol}>
              {getPercentageUntilGoal(item.price)}%
            </Text>
            <Text style={styles.textDescription}>{item.description}</Text>
            <Text style={styles.textPrice}>
              ${parseFloat(item.price).toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.xButtonContainer}
              onPress={() => removeGoal(item.id)}
            >
              <Image
                style={styles.xButton}
                source={require("./../images/xButton.png")}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputFieldDescription}>
          <TextInput
            style={styles.textInput}
            placeholder="Ex.Skateboard"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            onChangeText={(change) => setItemDescription(change)}
            clearButtonMode="always"
          />
        </View>
        <View style={styles.inputFieldPrice}>
          <Text style={styles.preInputField}>$</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            onChangeText={(change) => setItemPrice(change)}
            clearButtonMode="always"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addGoal}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: "5%",
    paddingTop: "10%",
    textAlign: "left",
    color: "#373737",
  },

  // for input area
  inputContainer: {
    paddingTop: 15,
    flex: 1,
    flexDirection: "row",
  },
  preInputField: {
    color: "#CCCCCC",
    fontSize: 20,
    paddingRight: "3%",
  },
  inputFieldPrice: {
    flex: 2,
    flexDirection: "row",
  },
  inputFieldDescription: {
    flex: 3,
    flexDirection: "row",
    width: "100%",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: "100%",
    width: "80%",
    fontSize: 15,
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  // button
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#006400",
    backgroundColor: "#006400",
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    paddingTop: "5%",
  },

  // text
  rowHeadings: {
    fontWeight: "bold",
  },
  containerGreen: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#d9f9b1",
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
  },
  containerNormal: {
    padding: 10,
    marginTop: 3,
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
  },
  containerHeading: {
    padding: 10,
    marginTop: 3,
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: "#4f603c",
    textAlign: "left",
  },
  numCol: {
    color: "#373737",
    textAlign: "left",
    flex: 1,
  },
  textDescription: {
    color: "#373737",
    textAlign: "left",
    flex: 2,
  },
  textPrice: {
    color: "#373737",
    textAlign: "right",
    flex: 2,
  },
  xButton: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  xButtonContainer: {
    flex: 1,
  },
});

export default Goals;
