import { Ionicons } from '@expo/vector-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../UserContext/UserContext.js';
import ModalPreviewBill from '../Components/ModalPreviewBill/ModalPreviewBill.jsx';
import ModalsProducts from '../Components/ModalsProducts/ModalsProducts.jsx';
import styles from './recordPurchase.js';

export default function RecordPurchase() {

  const [searchTextCustomer, setSearchTextCustomer] = useState('');
  const [searchTextProduct, setSearchTextProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectPrice, setPriceProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedProductId, setSelectedProductId]=useState([]);
  const { store } = useContext(UserContext);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchCustomers = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          const storeId = store.id;

          if (!storeId) {
            console.error('ID de tienda no disponible en el contexto');
            return;
          }

          const response = await axios.get('http://192.168.0.9:3000/store/getCustomers', {
            headers: {
              Authorization: `Bearer ${token}`,
              storeId: storeId,
            },
          });
          const sortedCustomers = response.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
          setCustomers(sortedCustomers);
          setFilteredCustomers(sortedCustomers);
        } catch (error) {
          console.error('Error buscando clientes:', error);
        }
      };
      fetchCustomers();
    }, [store])
  );

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchTextCustomer('');
    setFilteredCustomers([]);
  };
  const handleSearchCustomerChange = (text) => {
    setSearchTextCustomer(text);
    const filtered = customers.filter(
      (customer) => customer.fullName && customer.fullName.toLowerCase().includes(text.toLowerCase())||
      (customer.idNumber && customer.idNumber.toString().includes(text))
    );
    setFilteredCustomers(filtered);
  };

  const [facturaData, setFacturaData] = useState({
    customer: null,
    products: [],
    total: 0,
    trusted:false
  });


  useFocusEffect(
    React.useCallback(() => {
      const fetchProducts = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          const storeId = store.id;
      
          if (!storeId) {
            console.error('ID de tienda no disponible en el contexto');
            return;
          }
      
          const response = await axios.get('http://192.168.0.9:3000/store/getProducts', {
            headers: {
              Authorization: `Bearer ${token}`,
              storeId: storeId,
            },
          });
      
          const productsWithoutImage = response.data.map(product => {
            const { imgProduct, ...rest } = product;  // Excluye imgProduct
            return rest;
          });
      
          const sortedProducts = productsWithoutImage.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
          setProducts(sortedProducts);
          setFilteredProducts(sortedProducts);
        } catch (error) {
          console.error('Error buscando productos:', error);
        }
      };

      fetchProducts();
    }, [store])
  );


  const handleSearchProductChange = (text) => {
    setSearchTextProduct(text);
    // console.log("Producto buscado:", text);  // Aquí se imprime lo que el usuario está buscando

    const filtered = products.filter((product) =>
      product.nameProduct.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log("Resultados:",filtered)
  };

  const addSelectedProduct = (product) => {
    setSelectedProductName(product.nameProduct);
    setPriceProduct(product.salePrice);
    setIsModalVisible(true);
    setSearchTextProduct('');
    setFilteredProducts([]);
    setSelectedProductId(product.id);

  };

  const handleAccept = (resultPrice, numericAmount) => {
    setSelectedProducts([...selectedProducts, { 
      id: selectedProductId,
      Producto: selectedProductName, 
      Prc_Und: selectPrice, 
      Amount: numericAmount, 
      TotalPrice: resultPrice }]);
    setIsModalVisible(false);
  };

  const handleDeleteRecord = (index) => {
    const updatedProducts = selectedProducts.filter((product, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    if (selectedProducts.length === 0) {
      return 0;
    }
    return selectedProducts.reduce((total, product) => total + product.TotalPrice, 0);
  };

  useEffect(() => {
    const total = calculateTotal();
  }, [selectedProducts]);

  const openPreviewModal = () => {
    const total = calculateTotal();
    setIsPreviewModalVisible(true);
    setFacturaData({
      customer: selectedCustomer,
      products: selectedProducts,
      total: total,
      trusted: checked,
      storeId: store.id || store.storeId, // Ajuste para tomar storeId si es necesario
      nameStore: store.nameStore || 'Nombre de tienda por defecto' // Asegúrate de que existe un valor
    });
  };
  const handleQRCodeScan = async (qrData) => {
    try {
      const scannedIdNumber = qrData.trim(); // Elimina espacios adicionales
      console.log("Id escaneado:", scannedIdNumber);
  
      // Asegúrate de que ambos sean del mismo tipo (string o number)
      const matchedCustomer = customers.find(customer => String(customer.idNumber) === String(scannedIdNumber));
  
      if (matchedCustomer) {
        setSelectedCustomer(matchedCustomer);
        // setSearchTextCustomer(matchedCustomer.fullName); 
        console.log("Cliente encontrado:", matchedCustomer.fullName);
      } else {
        console.log('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
    }
  };
  const handleOpenQRCodeScanner = () => {
    navigation.navigate('QRScaneer', {
      onScanSuccess: handleQRCodeScan, 
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.rowTileRP}>
        <Text style={styles.titleRecordP}>Registrar compra</Text>
      </View>
      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre del cliente"
          style={styles.inputSearchCustomer}
          value={searchTextCustomer}
          onChangeText={handleSearchCustomerChange}
        />
        <Text>Ó</Text>
        <View style={{flexDirection:'column',width:'15%', alignItems:'center'}}>          
          <TouchableOpacity >
            <Ionicons name="qr-code" size={28} color="green" onPress={handleOpenQRCodeScanner}/>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={{width:'100%',flexDirection:'row',}}>
        {searchTextCustomer !== '' && (
          <ScrollView style={styles.scrollViewCustomers}>
            {filteredCustomers.map((customer, index) => (
              <TouchableHighlight
                key={index}
                style={styles.buttonScrollviewCustomer}
                underlayColor="#d9d9d9"
                onPress={() => selectCustomer(customer)}
              >
                <View style={styles.contentRowButtonSCProd}>
                  <View style={styles.contentColumnButtonSCProd}><Text>{customer.fullName}</Text></View>
                  <View style={styles.contentColumnButtonSCProd}><Text>{customer.typeDocument}:{customer.idNumber}</Text></View>
                </View>

              </TouchableHighlight>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.rowTextInput}>
        <TextInput
          placeholder="Nombre del producto"
          style={styles.inputsRecordP}
          value={searchTextProduct}
          onChangeText={handleSearchProductChange}
        />
      </View>
      <View style={{width:'100%',flexDirection:'row'}}>
          {searchTextProduct !== '' && (
            <ScrollView style={styles.scrollViewProducts}>
              {filteredProducts.map((item, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.buttonScrollviewProduct}
                  underlayColor="#d9d9d9"
                  onPress={() => addSelectedProduct(item)}
                >
                  <View style={styles.contentRowButtonSCProd}>
                    <View style={styles.contentColumnButtonSCProd}><Text>{item.nameProduct}</Text></View>
                    <View style={styles.contentColumnButtonSCProd}><Text>$ {item.salePrice}</Text></View>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          )}
        </View>
      <View style={styles.rowCheckBox}>
        <Text style={styles.textCheckBox}>Fiar</Text>
        <View style={styles.checkBox}>
          <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)} >
            {checked && <Ionicons name="checkmark" size={18} color="white" />}
          </Pressable>
        </View>
      </View>
      <View style={styles.rowContentTitleBill}>
        <Text style={styles.rowTitleBill}>Previsualización de compra</Text>
      </View>
      <View style={styles.rowContentBill}>
        <View style={styles.contentBill}>
          <View style={styles.rowsTitleCustomerBill}>
            <View style={styles.rowCustomer}>
              <Text style={styles.customerName}>Cliente: {selectedCustomer ? selectedCustomer.fullName : ''}</Text>
            </View>
          </View>
          <View style={styles.rowTitlesTable}>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Producto</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Und/lbs</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Prc. und</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Prc. Total</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text style={styles.textTitle}>Eliminar</Text>
            </View>
          </View>
          <ScrollView>
            {selectedProducts.map((product, index) => (
              <View key={index} style={styles.rowTitlesTable}>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.Producto}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.Amount}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.Prc_Und}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <Text style={styles.textTitle}>{product.TotalPrice}</Text>
                </View>
                <View style={styles.contentTitle}>
                  <TouchableHighlight onPress={() => handleDeleteRecord(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </TouchableHighlight>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.rowContentTotalPrice}>
            <View style={styles.columnTitleTotalPrice}>
              <Text style={styles.txtTitleTotal}>Total</Text>
            </View>
            <View style={styles.columnResultTotalPrice}>
              <Text style={styles.txtResultTotalPrice}>{calculateTotal()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rowButtonSaveBuy}>
        <TouchableHighlight
          style={styles.buttonSaveBuy}
          onPress={openPreviewModal}
        >
          <Text style={styles.txtButtonSaveBuy}>Guardar compra</Text>
        </TouchableHighlight>
      </View>
      <React.Fragment>
        <ModalsProducts
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          productName={selectedProductName}
          priceProduct={selectPrice}
          onAccept={handleAccept}
        />
        <ModalPreviewBill
          isVisible={isPreviewModalVisible}
          onClose={() => setIsPreviewModalVisible(false)}
          facturaData={{
            customer: selectedCustomer,
            products: selectedProducts,
            total: calculateTotal(),
            trusted:checked,
            storeId: store.id,       // Pasar el ID de la tienda
            nameStore: store.nameStore // Pasar el nombre de la tienda
          }}
          onGenerateInvoice={() => {
            // Aquí puedes añadir la lógica para generar la factura
            setIsPreviewModalVisible(false);
          }}
        />
      </React.Fragment>
    </View>
  );
}
