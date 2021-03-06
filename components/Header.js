import React, { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";

const Header = () => {
  const titleText = useState("Piggybank");
  const bodyText = useState("Start learning to manage your money");

  return (
    <>
      
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>
          
          <Image style={styles.logo} source={require("./../images/piggy.png")} />
            {"  "} Piggybank
        </Text>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#373737"
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Header;
