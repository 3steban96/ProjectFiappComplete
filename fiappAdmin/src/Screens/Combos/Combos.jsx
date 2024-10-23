import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { UserContext } from '../../UserContext/UserContext';
import UserActionsBar from "../Components/UserActionsBar/UserActionsBar.jsx";
import styles from "./combosStyle";

export default function Combos({ navigation }) {
  const [combos, setCombos] = useState([]);
  const [filteredCombos, setFilteredCombos] = useState([]);
  const [searchTextCombo, setSearchTextCombo] = useState("");
  const { store } = useContext(UserContext);

    useFocusEffect(
      React.useCallback(() => {
        const fetchCombos = async () => {
          if (!store || !store.id) {
            alert('No se encontró el ID de la tienda. Por favor, inicie sesión nuevamente.');
            return;
          }
      
          try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.get('http://192.168.0.6:3000/store/getCombos',{
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            // console.log('API response:', response.data); // Agregar esto para depurar

            // Extraer el array del response
            const combosArray = response.data || [];
            setCombos(combosArray);
            setFilteredCombos(combosArray);
          } catch (error) {
            console.error('Error buscando Combos:', error);
          }
        };
        fetchCombos();
      }, [])
    );

  const handleSearchComboChange = (text) => {
    setSearchTextCombo(text);
    const filtered = combos.filter((combo) =>
      combo.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCombos(filtered);
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <UserActionsBar style={styles.styleCompUserAB} />
      <View style={styles.rowTitleP}>
        <Text style={styles.titleRecordP}>Combos</Text>
      </View>
      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre del combo"
          style={styles.inputRecordP}
          value={searchTextCombo}
          onChangeText={handleSearchComboChange}
        />
      </View>
      <View style={styles.rowContentPromotions}>
  <View style={styles.contentSCPromotion}>
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {filteredCombos.map((combo, index) => (
        <View key={index} style={styles.comboCard}>
          {/* Imagen del combo */}
          <Image style={styles.comboImage} source={{ uri: `data:image/png;base64,${combo.imgProduct}` }} />
          
          {/* Contenido del combo */}
          <View style={styles.comboContent}>
            <Text style={styles.comboTitle}>{combo.name}</Text>
            <Text style={styles.comboDescription}>{combo.description}</Text>
            
            {/* Artículos */}
            <View style={styles.comboArticles}>
              <Text style={styles.comboArticlesLabel}>Artículos: </Text>
              {combo.products && combo.products.length > 0 ? (
                <Text style={styles.comboArticlesText}>
                  {combo.products.reduce((acc, product, index) => acc + `${index > 0 ? ', ' : ''}${product.nameProduct} (${product.amount}${product.unitType})`, '')}
                </Text>
              ) : (
                <Text style={styles.comboNoProducts}>No hay productos para este combo.</Text>
              )}
            </View>
            
            {/* Precio */}
            <View style={styles.comboPriceContainer}>
              <View style={styles.comboPriceBox}>
                <Text style={styles.comboPriceText}>${combo.totalPriceCombo}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
</View>

      <View style={styles.rowBtnAddPromotion}>
        <TouchableOpacity style={styles.btnAddPromotion} onPress={() => navigation.navigate("CreateCombo")}>
          <Text style={styles.submitButtonText}>Crear combo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}