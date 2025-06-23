import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Remplace ceci par l'IP locale de ton PC sur le même réseau que ton téléphone
const BACKEND_URL = "http://localh:3000";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Pour que le cookie soit enregistré
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Succès", "Connexion réussie !");
        // Naviguer vers la page suivante ici (ex: Home)
        // navigation.navigate('Home');
      } else {
        Alert.alert("Erreur", data.error || "Échec de la connexion.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert("Erreur", "Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="space-y-6"
      >
        <View className="mb-10">
          <Text className="text-3xl font-bold text-center text-black">
            Se connecter
          </Text>
          <Text className="text-center text-gray-500 mt-2">
            Bienvenue de retour 👋
          </Text>
        </View>

        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-base text-black"
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-base text-black"
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          className={`bg-blue-600 py-4 rounded-xl mt-4 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          <Text className="text-center text-white text-lg font-semibold">
            {loading ? "Connexion..." : "Connexion"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
