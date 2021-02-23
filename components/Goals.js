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

const Goals = () => {
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

  return (
    <View>
      <Text style={styles.sectionHeader}>Purchase Goals</Text>
      {items.length == 0 && <Text>Saving up for an item? Add it here!</Text>}

      <View style={styles.inputContainer}>
        <View style={styles.inputFieldPrice}>
          <Text style={styles.preInputField}>$</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            onChangeText={(change) => setItemPrice(change)}
          />
        </View>

        <View style={styles.inputFieldDescription}>
          <TextInput
            style={styles.textInput}
            placeholder="Ex.Skateboard"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            onChangeText={(change) => setItemDescription(change)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addGoal}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
            style={styles.containerHeading}
          >
              <Text style={styles.numCol}>Num</Text>
            <Text style={styles.textDescription}>Description</Text>
            <Text style={styles.textPrice}>Price</Text>
          </View>
      <View>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={styles.container}
          >
            <Text style={styles.numCol}>{index + 1}</Text>
            <Text style={styles.textDescription}>{item.description}</Text>
            <Text style={styles.textPrice}>{item.price}</Text>
          </View>
        ))}
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
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#d9f9b1",
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
    flex: 3,
  },
  textPrice: {
    color: "#373737",
    textAlign: "left",
    flex: 2,
  },
});

export default Goals;
