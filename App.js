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
} from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionVal, setTransactionVal] = useState("");

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
        id: transactions.length + 1,
        amount: cleanedTransactionVal,
        date: getCurrentDate(),
      },
    ];
    setTransactions(newTransactions);
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
      transaction => transactionId !== transaction.id
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
              <>
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
                    style={styles.removeButton}
                    onPress={() => removeTransaction(transaction.id)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="$0.00"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              onChangeText={(change) => setTransactionVal(change)}
            />
          </View>
          <View style={styles.inputButton}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={addTransaction}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subtractButton}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={subtractTransaction}
            >
              <Text style={styles.buttonText}>Subtract</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    padding: "10%",
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
    padding: "5%",
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
  },
  transactionsDate: {
    flex: 3,
  },
  transactionsAmount: {
    flex: 2,
    textAlign: "right",
  },
  // remove button
  removeButton: {
    flex: 2,
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    paddingTop: "5%",
    width: "80%",
  },

  // for input area
  inputContainer: {
    paddingTop: 15,
    flex: 1,
    flexDirection: "row",
  },
  inputField: {
    paddingTop: 15,
    flex: 2,
    flexDirection: "row",
  },
  inputButton: {
    paddingTop: 15,
    flex: 2,
    flexDirection: "row",
  },
  subtractButton: {
    paddingTop: 15,
    flex: 2,
    flexDirection: "row",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    width: "80%",
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  // button
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    paddingTop: "5%",
    width: "80%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    paddingTop: "5%",
  },
});

export default App;
