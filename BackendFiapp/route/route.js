const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require('path');


const {registerStore} =require('../controllers/Store/registerStore');
const loginStore = require('../controllers/Store/loginStore');
const { updateProduct, getSuppliers, postProducts,  getProducts,  deleteProduct  } = require('../controllers/Store/controllersProducts');
const { invoiceGenerated, invoiceGetCustomer } = require('../controllers/Store/invoiceGenerated');
const { createPromotion, getPromotionsWithProducts } = require('../controllers/Store/controllerPromotions');
const { postCombos, getCombos } = require('../controllers/Store/controllerCombos');
const { deleteCustomer,  getCustomers,  getCustomerInvoicesForStore } = require('../controllers/Store/customerManagement');
const { associateCustomerToStore, updateCreditLimit, addPayment } = require('../controllers/Store/customerStoreManagement');


const {registerCustomer} =require('../controllers/Customer/registerCustomer');
const loginCustomer = require('../controllers/Customer/loginCustomer');

const authenticateToken = require('../MiddlewareS/middlewareStore');
const { getCombosCustomerStore, getCombosForCustomerByStore } = require('../controllers/Customer/getCombosCustomer');
const { getCombosCustomerAllStore } = require('../controllers/Customer/getCombosCustomer');
const getStoresAssociatedCustomer = require('../controllers/Customer/getStoresAssociatedCustomer');
const { getProductsStoreAssociatedCustomer } = require('../controllers/Customer/getProductsStoreAssociatedCustomer');
const {getInvoicesCustomer} = require('../controllers/Customer/getInvoicesCustomer');
const { invoiceDownloadCustomer } = require('../controllers/Customer/downloadInvoicesCustomer');
const { PushNotifications } = require('../controllers/Store/controllerNotifications');
const { recoveryPasswordStore, resetPasswordStore } = require('../controllers/Store/recoveryPasswordStore');
const { recoveryPasswordCustomer, resetPasswordCustomer } = require('../controllers/Customer/recoveryPasswordCustomer');
const router = express.Router();

/*Funciones en funcionamiento*/
/*Store*/
router.get('/store/getCustomers', authenticateToken, getCustomers);
router.get('/store/getCustomerInvoicesForStore/:customerId', authenticateToken, getCustomerInvoicesForStore);
router.get('/store/getProducts', authenticateToken, getProducts);
router.post('/store/associateCustomer', authenticateToken, associateCustomerToStore);
router.post('/store/updateCreditLimit', authenticateToken, updateCreditLimit);
router.post('/store/postProducts', authenticateToken, upload.single('imgProduct'), postProducts);
router.post('/store/login', loginStore);
router.post('/store/regiter', registerStore);
router.get('/store/downloadInvoice/:idNumber/:purchaseId',authenticateToken, invoiceGetCustomer);
router.get('/store/download/:filename', (req, res) => {
    const file = path.join(__dirname, '../controllers/', 'invoices', req.params.filename);
    res.download(file, err => {
        if (err) {
            res.status(500).send('Error al descargar el archivo');
        }
    });
});
router.get('/store/getSuppliers',authenticateToken, getSuppliers);
router.delete('/store/deleteProducts', authenticateToken, deleteProduct);
router.patch('/store/updateProduct', authenticateToken, updateProduct);
router.post('/store/createPromotion',authenticateToken, createPromotion);
router.post('/store/createCombo',authenticateToken, upload.single('imgProduct'), postCombos);
router.get('/store/getCombos',authenticateToken, getCombos);
router.get('/store/getPromotions',authenticateToken, getPromotionsWithProducts);
router.post('/store/invoiceGenerated',authenticateToken, invoiceGenerated);
router.patch('/store/addPayment',authenticateToken, addPayment);
router.post('/store/sendNotification',authenticateToken, PushNotifications);
router.post('/store/recoveryPassword', recoveryPasswordStore);
router.post('/store/resetPassword', resetPasswordStore);

/*Customers*/
router.post('/customer/register', registerCustomer);
router.post('/customer/login', loginCustomer);
router.get('/customer/getCombosCustomer',authenticateToken, getCombosCustomerStore);
router.get('/customer/:customerId/getCombosCustomerAllStore',authenticateToken, getCombosCustomerAllStore);
router.get('/customer/:customerId/combos/store/:storeId',authenticateToken, getCombosForCustomerByStore);
router.get('/customer/getStoresAssociatedCustomer/:customerId',authenticateToken, getStoresAssociatedCustomer);
router.get('/customer/getProductsStoreAssociatedCustomer/:customerId/:storeId/:category', authenticateToken, getProductsStoreAssociatedCustomer);
router.get('/customer/getInvoicesCustomer/:customerId', authenticateToken, getInvoicesCustomer);
router.get('/customer/downloadInvoiceCustomer/:idNumber/:fileName',authenticateToken, invoiceDownloadCustomer);
router.get('/customer/download/:filename', (req, res) => {
    const file = path.join(__dirname, '../controllers/', 'invoices', req.params.filename);
    res.download(file, err => {
        if (err) {
            res.status(500).send('Error al descargar el archivo');
        }
    });
});
router.post('/customer/recoveryPassword', recoveryPasswordCustomer);
router.post('/customer/resetPassword', resetPasswordCustomer);
/**/



router.delete('/deleteCustomer', deleteCustomer);


/*Prueba*/
module.exports= router;