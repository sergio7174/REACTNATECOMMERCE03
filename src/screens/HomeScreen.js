import { View, Text, TouchableOpacity,Button, FlatList,} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Home.styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, SIZES } from "../constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Welcome from "../components/home/welcome";
import CarouselSnap from "../components/home/Carousel";
import ProductRow from "../components/products/ProductRow";
import { getProducts } from "../backendData/data";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from '../firebase/firebaseConfig'; // Assuming you have your firebase config set up 

export default function HomeScreen() {

  const [name, setName] = useState("");

  //fetching the products on the base of Gender Category
  const newArrivals = getProducts().filter(
    (product) => product.Gender === "girl"
  );
  const boysProducts = getProducts().filter(
    (product) => product.Gender === "Boys"
  );
  const menProducts = getProducts().filter(
    (product) => product.Gender == "Men"
  );
  const womenProducts = getProducts().filter(
    (product) => product.Gender == "Women"
  );

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
       setName(user.email);
    });
    return unsubscribe;
  }, []);


  return (

  <SafeAreaView> 
    <ScrollView showsVerticalScrollIndicator={true}>
     <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
           <Text style={styles.User}>Hello {name} </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderScreen")}>
              <MaterialIcons name="home" size={33} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

         <Welcome/>
         <CarouselSnap/>
       <view style={{ height: 400, marginBottom: 10 }}>
         <View style={styles.title}>
          <View>
            <Text style={styles.titletxt}>Girls Apparels</Text>
              <ProductRow products={newArrivals} />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titletxt}>Boys Apparels</Text>
          <ProductRow products={boysProducts} />
        </View>

        <View style={styles.title}>
          <Text style={styles.titletxt}>Men Footwear</Text>
          <ProductRow products={menProducts} />
        </View>

        <View style={styles.title}>
          <Text style={styles.titletxt}>Women Footwear</Text>
          <ProductRow products={womenProducts} />
        </View>

       
      </view>
    </ScrollView>
  </SafeAreaView>   
  );
}