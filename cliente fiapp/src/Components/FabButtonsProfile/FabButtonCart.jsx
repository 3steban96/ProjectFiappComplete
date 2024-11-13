import React,{useState} from 'react';
import { View,Text } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import ModalCartShop from '../ModalCreditCustomer/ModalCartShop';

export default function FabButtonCart({ storeId, idNumber, facturaData, handleDeleteProduct,handleSendProductsWhatsapp }) {
  const [state, setState] = useState({ open: false });
  const [isModalVisible, setModalVisible] = useState(false);

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <PaperProvider>
        <Portal>
          <FAB.Group
            fabStyle={{ backgroundColor: "#1F8169" }}
            color="white"
            open={open}
            icon={open ? 'plus' : 'cart'}
            actions={[
              {
                icon: 'book-open',
                color: "white",
                style: { backgroundColor: 'blue' },
                label: 'Previsualización',
                onPress: handleOpenModal,
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
        {isModalVisible && (
          <ModalCartShop
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            storeId={storeId}
            idNumber={idNumber}
            facturaData={facturaData}
            handleDeleteProduct={handleDeleteProduct} // Pasamos la función
            handleSendProductsWhatsapp={handleSendProductsWhatsapp} // Pasamos la función
          />
        )}
      </PaperProvider>
    </View>
  );
}

