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

export default function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(Math.round(Math.random() * 1000));

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
      <View
        ref={component => (this.myView = component)}
        style={{ padding: 10, backgroundColor: `#${color}` }}
      >
        <Text style={{ color: "white" }}>
          Open up App.js to start working on your app!
        </Text>
      </View>
      <Button title="Snappy snap" onPress={this.generatePDF} />
      <Button title="Share It" onPress={this.shareIt} />
      <Button
        title="Change Color"
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setColor(Math.round(Math.random() * 1000));
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
