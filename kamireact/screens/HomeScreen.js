import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://triptokyrgyzstan.com/sites/default/files/styles/hero/public/images/2019-04/slide-1960x857-07.jpg.webp?itok=PMx4TeLB",
        }}
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={["rgba(0, 150, 255, 0.5)", "rgba(255, 255, 255, 1)"]}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://macroscop.com/media/2192/download/mezhdunarodnyj%20aeroport%20manas.logo.png?v=1",
              }}
              style={styles.logo}
            />
            <Text style={styles.title}>Добрый день!</Text>
          </View>
          <View style={styles.searchSection}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="black"
              onPress={() => navigation.navigate("NotificationSettingsScreen")}
              style={styles.notificationIcon}
            />
            <TextInput
              placeholder="Искать рейс, услугу или информацию"
              style={styles.searchInput}
            />
            <Ionicons name="search-outline" size={24} color="black" />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.services}
          >
            <TouchableOpacity style={styles.serviceButton}>
              <Ionicons name="car-outline" size={24} color="black" />
              <Text style={styles.serviceText}>Автопарк</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <FontAwesome5 name="taxi" size={24} color="black" />
              <Text style={styles.serviceText}>Такси и транспорт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Ionicons name="cart-outline" size={24} color="black" />
              <Text style={styles.serviceText}>Магазины</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <MaterialIcons name="restaurant-menu" size={24} color="black" />
              <Text style={styles.serviceText}>Кафе</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="black"
              />
              <Text style={styles.serviceText}>Инфа</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.centerButtonContainer}>
            <TouchableOpacity style={styles.allServicesButton}>
              <Text style={styles.allServicesText}>Все услуги</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.tipsTitle}>Советы</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsContainer}
          >
            {[
              {
                title: "Экологические советы",
                description: "Соблюдайте чистоту и природу",
              },
              {
                title: "Как избежать задержек",
                description: "Планируйте заранее",
              },
              {
                title: "Что взять с собой",
                description: "Не забудьте важные вещи",
              },
            ].map((tip, index) => (
              <LinearGradient
                key={index}
                colors={["#4DA8E1", "#0099FF"]}
                style={styles.tipCard}
              >
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </LinearGradient>
            ))}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, justifyContent: "center" },
  gradient: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20 },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  title: { fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
  notificationIcon: { marginRight: 10, padding: 5 },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  searchInput: { flex: 1, paddingHorizontal: 10 },
  services: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  serviceButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 15,
    width: 110,
    height: 110,
    marginHorizontal: 10,
  },
  serviceText: { color: "black", marginTop: 5, fontWeight: "500" },
  centerButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  allServicesButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 150, 255, 0.8)",
    padding: 12,
    borderRadius: 15,
    width: 160,
  },
  allServicesText: { color: "white", fontWeight: "bold" },
  tipsTitle: { fontSize: 24, marginTop: 20, textAlign: "center" },
  tipsContainer: { flexDirection: "row", paddingVertical: 10 },
  tipCard: {
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    width: 250,
    height: 160,
  },
  tipTitle: { fontWeight: "bold", color: "white", marginBottom: 5 },
  tipDescription: { color: "white" },
});

export default HomeScreen;
