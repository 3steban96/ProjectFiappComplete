import React,{useState} from 'react';
import { View,Text } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import ModalCreditCustomer from '../ModalCreditCustomer/ModalCreditCustomer';
import { UserContext } from '../../../UserContext/UserContext';

export default function FabButtondProfile ({storeId, idNumber}) {
  const [state, setState] = useState({ open: false });
  const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  // Función para abrir el modal
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={{ position:'absolute',height:'100%',width:'100%'}}>
      <PaperProvider >
        <Portal >
          <FAB.Group
            fabStyle={{backgroundColor:"#1F8169"}}
            color='white'
            open={open}
            icon={open ? 'pencil' : 'plus'}
            actions={                    
              [                    
                {
                  icon: 'account-alert',
                  color:"white",
                  style: { backgroundColor: '#FF6347' },
                  label: 'Reportar',
                  onPress: () => console.log('Pressed star'),
                },
                {                    
                  icon: 'credit-card-edit',
                  color:"white",
                  style: { backgroundColor: 'blue' },
                  label: 'Modificar cupo',
                  onPress: handleOpenModal,
                },
                {
                  icon: 'account-cash',
                  color:"white",
                  style: { backgroundColor: 'green' },
                  label: 'Abonar',
                  onPress: () => console.log('Pressed notifications'),
                },
              ]
            }
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                // do something if the speed dial is open
                }
            }}
          />
        </Portal>
        {isModalVisible && (
          <ModalCreditCustomer
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            storeId={storeId}
            idNumber={idNumber}
            title="Modificar cupo del cliente"
          />
        )}
      </PaperProvider>

    </View>
  );
};

