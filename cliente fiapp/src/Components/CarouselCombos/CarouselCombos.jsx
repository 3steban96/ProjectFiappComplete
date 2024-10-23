import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Carousel } from 'react-native-basic-carousel';
import { ActivityIndicator, Avatar, Card, MD2Colors, Text } from 'react-native-paper';
import { UserContext } from '../../UserContext/UserContext.js';
import styles from './carouselComboStyle';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const { width, height } = Dimensions.get('window');

const ComboCarousel = ({ storeId }) => {
  const [combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customer } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCombos = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          const customerId = customer.id;

          if (!customerId) {
            console.error('ID de cliente no disponible en el contexto');
            return;
          }

          let url;
          if (storeId) {
            url = `http://192.168.0.6:3000/customer/${customerId}/combos/store/${storeId}`;
          } else {
            url = `http://192.168.0.6:3000/customer/${customerId}/getCombosCustomerAllStore`;
          }

          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCombo(response.data); // Guardar los combos recibidos en el estado
        } catch (error) {
          console.error('Error buscando Combos:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCombos();
    }, [storeId])
  );

  if (loading) {
    return <ActivityIndicator animating={true} color="red" />;
  } else if (combo.length === 0) {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} style={styles.cardTitle} />
        <Card.Cover source={{ uri: `data:image/png;base64,${item.imgProduct}` }} style={styles.cardImg} />
        <View style={styles.cardRowTotalPriceCombo}>
          <View style={styles.cardContentnameStore}>
            <Text style={styles.cardTxtTotalPrice}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
            </Text>
          </View>
          <View style={styles.cardContentTotalPrice}>
            <Text style={styles.cardTxtTotalPrice}>$<ActivityIndicator animating={true} color={MD2Colors.red800} /></Text>
          </View>
        </View>
        <Card.Title subtitle={item.description} style={styles.cardDescription} />
      </Card>
    );
  }

  return (
    <Carousel
      data={combo}
      renderItem={({ item, index }) => (
        <Card style={styles.card}>
          <Card.Title title={item.name} style={styles.cardTitle} />
          <Card.Cover source={{ uri: `data:image/png;base64,${item.imgProduct}` }} style={styles.cardImg} />
          <View style={styles.cardRowTotalPriceCombo}>
            <View style={styles.cardContentnameStore}>
              <Text style={styles.cardTxtTotalPrice}>{item.nameStore}</Text>
            </View>
            <View style={styles.cardContentTotalPrice}>
              <Text style={styles.cardTxtTotalPrice}>${item.totalPriceCombo}</Text>
            </View>
          </View>
          <Card.Title subtitle={item.description} style={styles.cardDescription} />
        </Card>
      )}
      itemWidth={width - 20}
      onSnapToItem={(index) => console.log('Current index:', index)}
      autoplay
      // paginationType="circle"
      // paginationPosition="bottom"
      // paginationColor='#1F8169'
      // pagination="true"

    />
  );
};

export default ComboCarousel;
