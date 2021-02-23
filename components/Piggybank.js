import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import Header from "./Header";
import Goals from "./Goals";
import React, { useState } from "react";

const Piggybank = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionVal, setTransactionVal] = useState("");
  const [id, setId] = useState(0);

  const cleanTransactionVal = () => {
    return parseFloat(
      (Math.round(parseFloat(transactionVal) * 100) / 100).toFixed(2)
    );
  };
  const addTransaction = () => {
    const cleanedTransactionVal = cleanTransactionVal();
    const newTransactions = [
      ...transactions,
      {
        id: id,
        amount: cleanedTransactionVal,
        date: getCurrentDate(),
      },
    ];
    setTransactions(newTransactions);
    setId(id + 1)
    console.log(transactions);
  };

  const subtractTransaction = () => {
    const cleanedTransactionVal = cleanTransactionVal();
    const newTransactions = [
      ...transactions,
      {
        id: transactions.length + 1,
        amount: -cleanedTransactionVal,
        date: getCurrentDate(),
      },
    ];
    setTransactions(newTransactions);
    console.log(transactions);
  };

  const removeTransaction = (transactionId) => {
    const newTransactions = transactions.filter(
      (transaction) => transactionId !== transaction.id
    );
    setTransactions(newTransactions);
  };
  const getTotalBalance = () => {
    return transactions.reduce((a, b) => a + b.amount, 0).toFixed(2);
  };

  const getFormattedTransactionValue = (val) => {
    return val.toFixed(2);
  };

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    console.log(mm + "/" + dd + "/" + yyyy);
    return mm + "/" + dd + "/" + yyyy;
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Header />
        </View>

        <View>
          <Text style={styles.sectionHeader}>
            Current Balance: ${getTotalBalance()}
          </Text>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Transactions</Text>
          {transactions.length == 0 && (
            <Text>Start by entering a transaction</Text>
          )}

          <View>
            {transactions.map((transaction) => (
              <View style={styles.transactions}>
                <Text
                  style={styles.transactionsDate}
                  key={`transaction-date-${transaction.id}`}
                >
                  {transaction.date}
                </Text>
                <Text
                  style={styles.transactionsAmount}
                  key={`transaction-val-${transaction.id}`}
                >
                  {getFormattedTransactionValue(transaction.amount)}
                </Text>

                  <TouchableOpacity
                    style={styles.xButtonContainer}
                    onPress={() => removeTransaction(transaction.id)}
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
            <View style={styles.inputField}>
              <Text style={styles.preInputField}>$</Text>
              <TextInput
                style={styles.textInput}
                placeholder="0.00"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                onChangeText={(change) => setTransactionVal(change)}
                clearButtonMode="always"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addTransaction}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.subtractButton}
                onPress={subtractTransaction}
              >
                <Text style={styles.buttonText}>Subtract</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Goals totalBalance={getTotalBalance()} />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    padding: "5%",
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10%",
  },
  sectionHeader: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: "5%",
    paddingTop: "5%",
    textAlign: "left",
    color: "#373737",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // transactions
  transactions: {
    flex: 1,
    flexDirection: "row",
    padding: "2%",
    // backgroundColor:"#FA8072",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
  transactionsDate: {
    flex: 3,
    color: "#373737",
  },
  transactionsAmount: {
    flex: 2,
    textAlign: "right",
  },
  transactionsButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // remove button
  removeButton: {
    backgroundColor: "#DC143C",
    width: "70%",
    height: "85%",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "center",
    paddingTop: "5%",
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
  inputField: {
    paddingTop: 15,
    flex: 2,
    flexDirection: "row",
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
  // buttons
  buttonContainer: {
    paddingTop: 15,
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#006400",
    backgroundColor: "#006400",
    width: "80%",
    height: "100%",
  },
  subtractButton: {
    borderWidth: 1,
    borderColor: "#FA8072",
    backgroundColor: "#DC143C",
    width: "80%",
    height: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    paddingTop: "5%",
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

export default Piggybank;
