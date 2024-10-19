import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import styles from './storeSelectedStyle';
import ComboCarousel from '../CarouselCombos/CarouselCombos';

const categories = [
  { name: 'Frutas y verduras', icon: require('../../../assets/icons/fruits-and-vegetables.png') },
  { name: 'Lacteos y Huevos', icon: require('../../../assets/icons/leche.png') },
  { name: 'Carnes y pescados', icon: require('../../../assets/icons/carne.png') },
  { name: 'Panadería y repostería', icon: require('../../../assets/icons/un-pan.png') },
  { name: 'Granos, pasta y legumbres', icon: require('../../../assets/icons/vegano.png') },
  { name: 'Cereales', icon: require('../../../assets/icons/maiz.png') },
  { name: 'Bebidas', icon: require('../../../assets/icons/jugo.png') },
  { name: 'Snacks y dulces', icon: require('../../../assets/icons/meriendas.png') },
  { name: 'Condimentos', icon: require('../../../assets/icons/especia.png') },
  { name: 'Bebidas alcohólicas', icon: require('../../../assets/icons/jarro-de-cerveza.png') },
];

export default function StoreSelected({ onCategorySelect, store }) {
  const { nameStore, id: storeId } = store;

  const handleCategoryProducts = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <View style={styles.container}>
        <StatusBar />    
        <View style={{ flex: 1.15 }}>
            <Text style={styles.nameStore}>{nameStore}</Text>
            <ComboCarousel storeId={storeId}/>
        </View>
        <Text style={styles.title}>Productos disponibles</Text>
        <View style={styles.rowContentProducts}>
            <ScrollView>
                <View style={styles.rowBttnsCategoryFood}>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Frutas y verduras')}>
                        <Text style={styles.txtBtnCategory}>Frutas y verduras</Text>
                        <Image source={require('../../../assets/icons/fruits-and-vegetables.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Lacteos y huevos')}>
                        <Text style={styles.txtBtnCategory}>Lacteos y Huevos</Text>
                        <Image source={require('../../../assets/icons/leche.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowBttnsCategoryFood}>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Carnes y pescados')}>
                        <Text style={styles.txtBtnCategory}>Carnes y pescados</Text>
                        <Image source={require('../../../assets/icons/carne.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Panadería y repostería')}>
                        <Text style={styles.txtBtnCategory}>Panadería y repostería</Text>
                        <Image source={require('../../../assets/icons/un-pan.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowBttnsCategoryFood}>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Granos, pasta y legumbres')}>
                        <Text style={styles.txtBtnCategory}>Granos, pasta y legumbres</Text>
                        <Image source={require('../../../assets/icons/vegano.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Cereales')}>
                        <Text style={styles.txtBtnCategory}>Cereales</Text>
                        <Image source={require('../../../assets/icons/maiz.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowBttnsCategoryFood}>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Bebidas')}>
                        <Text style={styles.txtBtnCategory}>Bebidas</Text>
                        <Image source={require('../../../assets/icons/jugo.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Snacks y dulces')}>
                        <Text style={styles.txtBtnCategory}>Snacks y dulces</Text>
                        <Image source={require('../../../assets/icons/meriendas.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowBttnsCategoryFood}>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Condimentos')}>
                        <Text style={styles.txtBtnCategory}>Condimentos</Text>
                        <Image source={require('../../../assets/icons/especia.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bttnCategoryFood} onPress={() => handleCategoryProducts('Bebidas alcohólicas')}>
                        <Text style={styles.txtBtnCategory}>Bebidas alcohólicas</Text>
                        <Image source={require('../../../assets/icons/jarro-de-cerveza.png')} style={styles.iconBtnCategory}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    </View>
  );
}
