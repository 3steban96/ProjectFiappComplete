import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { format } from 'date-fns';
import React, { useContext, useState } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { UserContext } from '../../UserContext/UserContext.js';
import UserActionsBar from "../Components/UserActionsBar/UserActionsBar.jsx";
import styles from "./discountsStyle.js";

export default function Discounts({ navigation }) {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchTextPromotion, setSearchTextPromotion] = useState("");
  const { store } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPromotions = async () => {
        try {
          // Obtener el token almacenado
          const token = await AsyncStorage.getItem('authToken'); // Ajusta esto según el método que uses para almacenar el token
          // console.log('Token almacenado:', token);
          // Obtener el storeId desde el contexto
          const storeId = store.id;
          // console.log("Id de la store",storeId)
          if (!storeId) {
            console.error('ID de tienda no disponible en el contexto');
            return;
          }
          const response = await axios.get('http://192.168.0.9:3000/store/getPromotions',{
            headers: {
              'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera
              'storeId': storeId 
            }
          });
          setPromotions(response.data);
          setFilteredPromotions(response.data);
        } catch (error) {
          console.error('Error buscando Promociones:', error);
        }
      };
      fetchPromotions();
    }, [])
  );
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  const handleSearchPromotionChange = (text) => {
    setSearchTextPromotion(text);
    const filtered = promotions.filter((promotion) =>
      promotion.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPromotions(filtered);
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <UserActionsBar/>
      <View style={styles.rowTitleP}>
        <Text style={styles.titleRecordP}>Descuentos</Text>
      </View>
      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre de la promoción"
          style={styles.inputRecordP}
          value={searchTextPromotion}
          onChangeText={handleSearchPromotionChange}
        />
      </View>

      <View style={styles.rowContentPromotions}>
        <View style={styles.contentSCPromotion}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {filteredPromotions.map((promotion, index) => (
              <View key={index} >
                <View style={styles.promotion}>
                  <View style={styles.contentImg}>
                    <Image
                      style={styles.imgPromotion}
                      source={{ uri: `data:image/png;base64,${promotion.products[0].imgProduct}` }}
                      resizeMode="cover"
                    />
                  </View>                  
                  <View style={styles.contentData}>
                    <Text style={styles.dataTitle}>{promotion.title}</Text>
                    <Text style={styles.dataValidity}>Vigencia: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}</Text>
                    <Text style={styles.dataDescription}>{promotion.description}</Text>
                    
                    <View style={styles.dataRowPrice}>
                      <Text style={styles.dataPriceBefore}>Antes: ${Math.round(promotion.products[0].salePrice)}</Text>
                      <Text style={styles.dataPriceNow}>Ahora: ${Math.round(promotion.products[0].pricePromotion)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.contentDiscount}>
                    <Text style={styles.dataTxtDiscount}>
                      -{promotion.discount}%
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.rowBtnAddPromotion}>
        <TouchableOpacity style={styles.btnAddPromotion} onPress={() => navigation.navigate("CreatePromotion")} >
          <Text style={styles.submitButtonText}>Crear Promoción</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
