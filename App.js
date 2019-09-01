import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  LayoutAnimation
} from "react-native";

import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import Svg, { Circle, Rect } from 'react-native-svg';

import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(Math.round(Math.random() * 1000));
  const [color2, setColor2] = useState(Math.round(Math.random() * 1000));

  generatePDF = async () => {
    let snapshot = await takeSnapshotAsync(this.myView);
    if (snapshot.startsWith("/")) {
      snapshot = "file://" + snapshot;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setImage(snapshot);
  };

  shareIt = async () => {
    let snapshot = await takeSnapshotAsync(this.myView);
    if (snapshot.startsWith("/")) {
      snapshot = "file://" + snapshot;
    }
    Sharing.shareAsync(snapshot, { UTI: "public.png" });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`#${color}`, `#${color2}`]}
        ref={component => (this.myView = component)}
        style={{ padding: 40 }}
      >
        <Svg height="50" width="50" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"
      />
      <Rect
        x="15"
        y="15"
        width="70"
        height="70"
        stroke="red"
        strokeWidth="2"
        fill="yellow"
      />
    </Svg>
        <Text style={{ color: "white" }}>
          Sharing via the app...?
        </Text>
      </LinearGradient>
      <Button title="Snappy snap" onPress={this.generatePDF} />
      <Button title="Share It" onPress={this.shareIt} />
      <Button
        title="Change Color"
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setColor(Math.round(Math.random() * 1000));
          setColor2(Math.round(Math.random() * 1000));
        }}
      />
      {image && (
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={{
            uri: image
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
