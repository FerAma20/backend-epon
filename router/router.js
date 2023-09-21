'use strict'

var express = require('express');
const oauthController = require('../controllers/OauthController');
const CompanyController = require('../controllers/CompanyController');
const CompanyBranchController = require('../controllers/CompanyBranchController');
const UnitMeasurementCategoryController = require('../controllers/UnitMeasurementCategoryController');
const UnitMeasureController = require('../controllers/UnitMeasureController');
const PackageController = require('../controllers/PackageController');
const ProductCategoryController = require('../controllers/ProductCategoryController');
const ProductTypeController = require('../controllers/ProductTypeController');
const ProductFamilyController = require('../controllers/ProductFamilyController');
const ProductController = require('../controllers/ProductController');
const LocationTypeController = require('../controllers/LocationTypeController');
const WarehouseController = require('../controllers/WarehouseController');
const OrderInventaryController = require('../controllers/OrderInventaryController');
const WarehouseProductController = require('../controllers/WarehouseProductController');
const WarehouseOrdinaryProductController = require('../controllers/WarehouseOrdinaryProductController');
const StatusOrderController = require('../controllers/StatusOrderController');
const OrderStatusDetailController = require('../controllers/OrderStatusDetailController');
const DetailStateAPOController = require('../controllers/DetailStateAPOController');
const AccountController = require('../controllers/AccountController');
const CyberSourceController = require('../controllers/CyberSourceController');
const CalendarGoogle = require('../controllers/CalendarGoogleController')
const NotesDebitCredit = require('../controllers/NoteDebitCreditController');
const DocumentFEL = require('../controllers/DocumentFELController');


const SucursalEmpresa = require('../controllers/SucursalEmpresaController');
const GasBomba = require('../controllers/GasBombaController');
const GasManguera = require('../controllers/GasMangueraController');
const GasTipoCombustible = require('../controllers/GasTipoCombustibleController');
const invHistoricoPrecioProd  = require('../controllers/invHistoricoPrecioProdController');
const GasTank  = require('../controllers/GasTankController');
const GasFuel = require('../controllers/GasFuelPrice');

const GasShift = require('../controllers/GasTurnoShiftController');
const GasReferenceShift = require('../controllers/GasReferenceShift');

const GasFuelTankGauging = require('../controllers/GasFuelTankGaugingController');

const GasFuelCalibtration = require('../controllers/GasFuelCalibrationController');

const GasFuelHose = require('../controllers/GasHoseSizeController');
const Proyecto = require('../controllers/ProyectController');
const Municipio = require('../controllers/MunicipioController');
const Encargado = require('../controllers/EncargadoController');

const BenefitController = require('../controllers/BenefitController');
const BenefitTypeController = require('../controllers/BenefitTypeController');
const ProjectBeneficiaryController = require('../controllers/ProjectBeneficiaryController');
const EthnicityController = require('../controllers/EthnicityController');
const ScholarshipController = require('../controllers/ScholarshipController');
const DisabilityController = require('../controllers/DisabilityController');
const GenericsController = require('../controllers/GenericsController');
const ProjectRequestController = require('../controllers/ProjectRequestController');
const ProjectReportController = require('../controllers/ProjectReportController');
const ProjectBeneficiaryRelationshipController = require('../controllers/ProjectBeneficiaryRelationshipController');
const CargoEconomicoController = require('../controllers/cceeCargoEconomicootrosController');
const ShippingType = require('../controllers/ShippingTypeController');
const ShippingList = require('../controllers/ShippingListController');
const ClientsController = require('../controllers/ClientsController');
const PointOfSale = require('../controllers/PointOfSaleController');
const CashierController = require('../controllers/CashierController');
const CashierPOSController = require('../controllers/CashierPointOfSaleController');

const PagoController = require('../controllers/PagoController');
const PagoMultipleController = require('../controllers/PagosMultiplesController');
const CloseCashier = require('../controllers/CloseCashierController');
const Cash = require('../controllers/CashController');

const CargaController = require('../controllers/CargaController');

var router = express.Router();

/** Ruta default */
router.get('/', (req, res)=> {
    console.log('test')
    res.status(200).send('exitoso')
});

/**Rutas OATH */
router.post('/users/login', oauthController.login)
//*Routas cybersource APIs */
router.post('/cybersource/paymenet', CyberSourceController.paymentVoid)

router.post('/cybersource/paymenetTest', CyberSourceController.paymentTest)
router.post('/cybersource/paymentencrypt', CyberSourceController.paymentencrypt)

//*Routas Companys APIs */
router.get('/company/readAllCompany', CompanyController.readAllCompany)
router.post('/company/createCompany', CompanyController.createCompany)
router.put('/company/updateCompany', CompanyController.updateCompany)
router.put('/company/deleteCompany', CompanyController.deleteCompany)

//*Routas Shipping Type APIs */
router.get('/shippingType/readAllShippingType', ShippingType.readAllShippingType)
router.post('/shippingType/createShippingType', ShippingType.createShippingType)
router.put('/shippingType/updateShippingType', ShippingType.updateShippingType)
router.put('/shippingType/deleteShippingType', ShippingType.deleteShippingType)

//*Routas Shipping List APIs */
router.get('/shippingList/readAllShippingList', ShippingList.readAllShippingList)
router.post('/shippingList/createShippingList', ShippingList.createShippingList)
router.put('/shippingList/updateShippingList', ShippingList.updateShippingList)
router.put('/shippingList/deleteShippingList', ShippingList.deleteShippingList)

//*Routas CalendarGoogle APIs */
router.post('/calendar/createEvent', CalendarGoogle.createEvent)
router.get('/calendar/getCalendar', CalendarGoogle.getCalendar)

//*Routas Documentos FEL APIs */
router.get('/docFEL/getInvoiceFEL', DocumentFEL.getInvoiceFEL)
router.post('/docFEL/createInvoiceFEL', DocumentFEL.createInvoiceFEL)
router.post('/docFEL/getListInvoice', DocumentFEL.listInvoice)
router.post('/docFEL/getListCargosInvoice', DocumentFEL.listCargosInvoice)

//*Routas Clientes APIs */
router.post('/clients/createClient', ClientsController.createClient)

//*Routas PointOfSale APIs */
router.post('/pointOfSale/readAllProductsPointOfSale', PointOfSale.readAllProductPointOfSale)
router.post('/pointOfSale/createEconomicCharge', PointOfSale.createEconomicCharge)
router.get('/pointOfSale/readAllDiscountPointOfSale', PointOfSale.readAllDiscountPointOfSale)

//*Routas GenerateNotes APIs */
router.post('/notesDC/createNote', NotesDebitCredit.createNoteDebitCredit)
//router.get('/calendar/getCalendar', CalendarGoogle.getCalendar)

//*Routas CompanyBranch APIs */
router.get('/companyBranch/readAllCompanyBranch', CompanyBranchController.readAllCompanyBranch)
router.post('/companyBranch/createCompanyBranch', CompanyBranchController.createCompanyBranch)
router.put('/companyBranch/updateCompanyBranch', CompanyBranchController.updateCompanyBranch)
router.put('/companyBranch/deleteCompanyBranch', CompanyBranchController.deleteCompanyBranch)

//*Routas Cashier APIs */
router.get('/cashier/readAllCashier', CashierController.readAllCashier)
router.post('/cashier/readTurnCashier', CashierController.readTurnCashier)
router.get('/cashier/readAllUsers', CashierController.readAllUsers)

//*Routas CashierPOS APIs */
router.get('/cashier/readAllCashierPOS', CashierPOSController.readAllCashierPOS)

//*Routas Account APIs */
router.get('/account/readAllAccount', AccountController.readAllAccount)
router.get('/account/readAllCostCenter', AccountController.readAllCostCenter)
router.get('/account/readAllSucursal', AccountController.readAllSucursal)
router.get('/account/readAllUsers', AccountController.readAllUsers)
router.get('/api/getAccountingItemTemplate', AccountController.getAccountingItemTemplate)
router.post('/api/readAllAccountingItems', AccountController.readAllAccountingItems)

//*Routas UnitMeasurementCategory APIs */
router.get('/categoryUM/readAllCategoryUM', UnitMeasurementCategoryController.readAllUnitMeasurementCategory)
router.post('/categoryUM/createCategoryUM', UnitMeasurementCategoryController.createUnitMeasurementCategory)
router.put('/categoryUM/updateCategoryUM', UnitMeasurementCategoryController.updateUnitMeasurementCategory)
router.put('/categoryUM/deleteCategoryUM', UnitMeasurementCategoryController.deleteUnitMeasurementCategory)

//*Routas UnitMeasure APIs */
router.get('/unitMeasure/readAllUnitMeasure', UnitMeasureController.readAllUnitMeasure)
router.post('/unitMeasure/createUnitMeasure', UnitMeasureController.createUnitMeasure)
router.put('/unitMeasure/updateUnitMeasure', UnitMeasureController.updateUnitMeasure)
router.put('/unitMeasure/deleteUnitMeasure', UnitMeasureController.deleteUnitMeasure)

//*Routas Package APIs */
router.get('/package/readAllPackage', PackageController.readAllPackage)
router.post('/package/createPackage', PackageController.createPackage)
router.put('/package/updatePackage', PackageController.updatePackage)
router.put('/package/deletePackage', PackageController.deletePackage)

//*Routas ProductCategory APIs */
router.get('/prodCategory/readAllProdCategory', ProductCategoryController.readAllProductCategory)
router.post('/prodCategory/createProdCategory', ProductCategoryController.createProductCategory)
router.put('/prodCategory/updateProdCategory', ProductCategoryController.updateProductCategory)
router.put('/prodCategory/deleteProdCategory', ProductCategoryController.deleteProductCategory)

//*Routas ProductType APIs */
router.get('/productType/readAllProductType', ProductTypeController.readAllProductType)
router.post('/productType/createProductType', ProductTypeController.createProductType)
router.put('/productType/updateProductType', ProductTypeController.updateProductType)
router.put('/productType/deleteProductType', ProductTypeController.deleteProductType)

//*Routas ProductFamily APIs */
router.get('/productFamily/readAllProductFamily', ProductFamilyController.readAllProductFamily)
router.post('/productFamily/createProductFamily', ProductFamilyController.createProductFamily)
router.put('/productFamily/updateProductFamily', ProductFamilyController.updateProductFamily)
router.put('/productFamily/deleteProductFamily', ProductFamilyController.deleteProductFamily)

//*Routas Product APIs */
router.get('/product/readAllProduct', ProductController.readAllProduct)
router.post('/product/readAllProductFuel', ProductController.readAllProductFuel)
router.post('/product/createProduct', ProductController.createProduct)
router.put('/product/updateProduct', ProductController.updateProduct)
router.put('/product/deleteProduct', ProductController.deleteProduct)

//*Routas LocationType APIs */
router.get('/locationType/readAllLocationType', LocationTypeController.readAllLocationType)
router.post('/locationType/createLocationType', LocationTypeController.createLocationType)
router.put('/locationType/updateLocationType', LocationTypeController.updateLocationType)
router.put('/locationType/deleteLocationType', LocationTypeController.deleteLocationType)

//*Routas Warehouse APIs */
router.get('/warehouse/readAllWarehouse', WarehouseController.readAllWarehouse)
router.post('/warehouse/createWarehouse', WarehouseController.createWarehouse)
router.put('/warehouse/updateWarehouse', WarehouseController.updateWarehouse)
router.put('/warehouse/deleteWarehouse', WarehouseController.deleteWarehouse)
router.post('/warehouse/getByStation', WarehouseController.getByStation)

//*Routas OrderInventary APIs */
router.get('/orderInventary/readAllOrderInventary', OrderInventaryController.readAllOrderInventary)
router.post('/orderInventary/createOrderInventary', OrderInventaryController.createOrderInventary)
router.put('/orderInventary/updateOrderInventary', OrderInventaryController.updateOrderInventary)
router.put('/orderInventary/deleteOrderInventary', OrderInventaryController.deleteOrderInventary)

//*Routas WarehouseProduct APIs */
router.get('/warehouseProduct/readAllWarehouseProduct', WarehouseProductController.readAllWarehouseProduct)
router.post('/warehouseProduct/createWarehouseProduct', WarehouseProductController.createWarehouseProduct)
router.put('/warehouseProduct/updateWarehouseProduct', WarehouseProductController.updateWarehouseProduct)
router.put('/warehouseProduct/deleteWarehouseProduct', WarehouseProductController.deleteWarehouseProduct)

//*Routas WarehouseOrdinaryProduct APIs */
router.get('/wOProduct/readAllWOProduct', WarehouseOrdinaryProductController.readAllWarehouseOrdinaryProduct)
router.post('/wOProduct/createWOProduct', WarehouseOrdinaryProductController.createWarehouseOrdinaryProduct)
router.post('/wOProduct/createWOProductList', WarehouseOrdinaryProductController.createWarehouseOrdinaryProductList)
router.put('/wOProduct/updateWOProduct', WarehouseOrdinaryProductController.updateWarehouseOrdinaryProduct)
router.put('/wOProduct/deleteWOProduct', WarehouseOrdinaryProductController.deleteWarehouseOrdinaryProduct)

//*Routas StatusOrder APIs */
router.get('/statusOrder/readAllStatusOrder', StatusOrderController.readAllStatusOrder)
router.post('/statusOrder/createStatusOrder', StatusOrderController.createStatusOrder)
router.put('/statusOrder/updateStatusOrder', StatusOrderController.updateStatusOrder)
router.put('/statusOrder/deleteStatusOrder', StatusOrderController.deleteStatusOrder)

//*Routas OrderStatusDetail APIs */
router.get('/orderStatusDetail/readAllOrderStatusDetail', OrderStatusDetailController.readAllOrderStatusDetail)
router.post('/orderStatusDetail/createOrderStatusDetail', OrderStatusDetailController.createOrderStatusDetail)
router.put('/orderStatusDetail/updateOrderStatusDetail', OrderStatusDetailController.updateOrderStatusDetailr)
router.put('/orderStatusDetail/deleteOrderStatusDetail', OrderStatusDetailController.deleteOrderStatusDetail)

//*Routas DetailStateAPO APIs */
router.get('/detailStateAPO/readAllDetailStateAPO', DetailStateAPOController.readAllDetailStateAPO)
router.post('/detailStateAPO/createDetailStateAPO', DetailStateAPOController.createDetailStateAPO)
router.put('/detailStateAPO/updateDetailStateAPO', DetailStateAPOController.updateDetailStateAPO)
router.put('/detailStateAPO/deleteDetailStateAPO', DetailStateAPOController.deleteDetailStateAPO)

//*Rutas SucursalEmpresa */
router.get('/SucursalEmpresa/readAllSucursal', SucursalEmpresa.readAllSucursalEmpresa)
router.post('/SucursalEmpresa/createSucursal', SucursalEmpresa.createSucursalEmpresa)
router.post('/SucursalEmpresa/readAllEstacionProducto', SucursalEmpresa.readAllEstacionProducto)
router.put('/SucursalEmpresa/updateSucursal', SucursalEmpresa.updateSucursalEmpresa)
router.put('/SucursalEmpresa/deleteSucursal', SucursalEmpresa.deleteSucursalEmpresa)

//*Rutas Bomba */
router.get('/Bomba/readAllGasBomba', GasBomba.readAllGasBomba)
router.post('/Bomba/readCodeGasBomba', GasBomba.readCodeGasBomba)
router.post('/Bomba/createGasBomba', GasBomba.createGasBomba)
router.put('/Bomba/updateGasBomba', GasBomba.updateGasBomba)
router.post('/Bomba/deleteGasBomba', GasBomba.deleteGasBomba)

//*Rutas Manguera */
router.get('/Manguera/readAllGasManguera', GasManguera.readAllGasManguera)
router.post('/Manguera/readAllGasMangueraBomba', GasManguera.readAllGasMangueraBomba)
router.get('/Manguera/readAllGasMangueraProducto', GasManguera.readAllGasMangueraProducto)
router.post('/Manguera/createGasManguera', GasManguera.createGasManguera)
router.put('/Manguera/updateGasManguera', GasManguera.updateGasManguera)
router.post('/Manguera/deleteGasManguera', GasManguera.deleteGasManguera)

//*Rutas TipoCombustible */ 
router.get('/TipoCombustible/readAllTipoCombustible', GasTipoCombustible.readAllGasTipoCombustible)
router.post('/TipoCombustible/createTipoCombustible', GasTipoCombustible.createGasTipoCombustible)
router.put('/TipoCombustible/updateTipoCombustible', GasTipoCombustible.updateGasTipoCombustible)
router.put('/TipoComubstible/deleteTipoCombustible', GasTipoCombustible.deleteGasTipoCombustible)


//*Rutas Historico Precio Prod*/
router.get('/invHistoricoProd/readAllGasManguera', invHistoricoPrecioProd.readAllinvHistoricoPrecioProd)
router.post('/invHistoricoProd/createGasManguera', invHistoricoPrecioProd.createinvHistoricoPrecioProd)
router.put('/invHistoricoProd/updateGasManguera', invHistoricoPrecioProd.updateinvHistoricoPrecioProd)
router.put('/invHistoricoProd/deleteGasManguera', invHistoricoPrecioProd.deleteinvHistoricoPrecioProd)
router.post('/invHistoricoProd/getByHose', invHistoricoPrecioProd.readInvHistoricoByHose)

//*Rutas para tank */
router.post('/GasTank/readAllGasTank', GasTank.readAllGasTank)
router.post('/GasTank/createGasTank', GasTank.createGasTank)
router.post('/GasTank/updateGasTank', GasTank.updateGasTank)

//*Rutas Historico Precio Prod*/
router.post('/GasFuelPrice/readAllFuelPrice', GasFuel.readAllFuelPrice)
router.post('/GasFuelPrice/CreateFuelPrice', GasFuel.createFuelPrice)
router.post('/GasFuelPrice/DeleteFuelPrice', GasFuel.deleteFuelPrice)

//*Rutas Historico Precio Prod*/
router.post('/GasTurnoShift/readAllEmpleado', GasShift.readAllEmpleado)
router.post('/GasTurnoShift/readAllTurno', GasShift.readAllTurno)
router.post('/GasTurnoShift/readAllTurnoFor', GasShift.readAllTurnoFor)
router.post('/GasTurnoShift/deleteTurnoShift', GasShift.deleteTurnoShift)
router.post('/GasTurnoShift/createTurnoShift', GasShift.CreateTurnoShift)

//*Rutas Turno Referencia*/
router.post('/GasReferenceShift/readAllReference', GasReferenceShift.readAllReference)
router.post('/GasReferenceShift/deleteTurnoShift', GasReferenceShift.deleteTurnoShift)
router.post('/GasReferenceShift/createReferenceShift', GasReferenceShift.CreateReferenceShift)
router.post('/GasReferenceShift/getByShiftAndHose', GasReferenceShift.getGasTurnoByShiftAndHose)
router.post('/GasReferenceShift/getByShift', GasReferenceShift.getGasTurnoByShift)

//*Rutas Tank Gauging*//
router.post('/GasReferenceShift/readHistory', GasFuelTankGauging.readHistory)
router.post('/GasReferenceShift/CreateFuelTankGauging', GasFuelTankGauging.CreateFuelTankGauging)
router.post('/GasReferenceShift/DeleteFuelTankGauging', GasFuelTankGauging.deleteFuelTankGauging)
router.post('/GasReferenceShift/UpdateFuelTankGauging', GasFuelTankGauging.UpdateFuelTankGauging)

/**Rutas tank calibracion GasFuelCalibtration*/
router.post('/GasFuelCalibration/readHistory', GasFuelCalibtration.readHistory)
router.post('/GasFuelCalibration/CreateFuelCalibration', GasFuelCalibtration.CreateFuelCalibration)
router.post('/GasFuelCalibration/deleteFuelCalibration', GasFuelCalibtration.deleteFuelCalibration)
router.post('/GasFuelCalibration/UpdateFuelCalibration', GasFuelCalibtration.UpdateFuelCalibration)

//***Rutas lectura mangueras */
router.post('/GasFuelHoseSize/readHistory', GasFuelHose.readHistory)
router.post('/GasFuelHoseSize/CreateFuelHoseSize', GasFuelHose.CreateFuelHoseSize)
router.post('/GasFuelHoseSize/deleteFuelHoseSize', GasFuelHose.deleteFuelHoseSize)
router.post('/GasFuelHoseSize/UpdateFuelHoseSize', GasFuelHose.UpdateFuelHoseSize)
router.post('/GasFuelHoseSize/CreateFuelHoseSizeMobile', GasFuelHose.CreateFuelHoseSizeMobile)
router.post('/GasFuelHoseSize/UpdateFuelHoseSizeMobile', GasFuelHose.UpdateFuelHoseSizeMobile)

//****Rutas proyectos */
router.post('/Municipio/readAllMunicipio', Municipio.readAllMunicipio)
router.post('/Municipio/readAllMunicipioId', Municipio.readAllMunicipioId)
router.post('/Municipio/readAllMunicipioforDep', Municipio.readAllMunicipioforDep)
router.post('/Municipio/readAllDepartamento', Municipio.readAllDepartamento)
router.post('/Municipio/readAllDepartamentoID', Municipio.readAllDepartamentoID)

router.post('/Proyecto/readAllProyectId', Proyecto.readAllProyectId)
router.get('/Proyecto/readAllProyect', Proyecto.readAllProyect)

router.post('/Encargado/readAllEncargadoP', Encargado.readAllEncargadoP)

//Rutas Benefit APIs
router.get('/benefit/readAll', BenefitController.readAll)
router.post('/benefit/create', BenefitController.create)
router.put('/benefit/update', BenefitController.update)
router.put('/benefit/delete', BenefitController.delete)
router.get('/benefit/readAll', BenefitController.readAll)
router.post('/benefit/project', BenefitController.getByProject)
router.post('/benefit/beneficiary', BenefitController.getByBeneficiary)

//Rutas BenefitType APIs
router.get('/benefitType/readAll', BenefitTypeController.readAll)
router.post('/benefitType/create', BenefitTypeController.create)
router.put('/benefitType/update', BenefitTypeController.update)
router.put('/benefitType/delete', BenefitTypeController.delete)

//Rutas ProjectBeneficiary APIs
router.get('/projectBeneficiary/readAll', ProjectBeneficiaryController.readAll)
router.post('/projectBeneficiary/create', ProjectBeneficiaryController.create)
router.put('/projectBeneficiary/update', ProjectBeneficiaryController.update)
router.put('/projectBeneficiary/delete', ProjectBeneficiaryController.delete)
router.post('/projectBeneficiary/filter', ProjectBeneficiaryController.filter)

//Rutas Ethnicity APIs
router.get('/ethnicity/readAll', EthnicityController.readAll)
router.post('/ethnicity/create', EthnicityController.create)
router.put('/ethnicity/update', EthnicityController.update)
router.put('/ethnicity/delete', EthnicityController.delete)

//Rutas Scholarship APIs
router.get('/scholarship/readAll', ScholarshipController.readAll)
router.post('/scholarship/create', ScholarshipController.create)
router.put('/scholarship/update', ScholarshipController.update)
router.put('/scholarship/delete', ScholarshipController.delete)

//Rutas Disability APIs
router.get('/disability/readAll', DisabilityController.readAll)
router.post('/disability/create', DisabilityController.create)
router.put('/disability/update', DisabilityController.update)
router.put('/disability/delete', DisabilityController.delete)

//Rutas Generics APIs
router.get('/generics/readAllLanguages', GenericsController.readAllLanguages)
router.get('/generics/readAllCountries', GenericsController.readAllCountries)
router.get('/generics/readAllTowns', GenericsController.readAllTowns)
router.post('/generics/login', GenericsController.login)

//Rutas ProjectRequest APIs
router.get('/projectRequest/readAll', ProjectRequestController.readAll)
router.post('/projectRequest/create', ProjectRequestController.create)
router.put('/projectRequest/update', ProjectRequestController.update)
router.put('/projectRequest/delete', ProjectRequestController.delete)

//Rutas ProjectReport APIs
router.get('/projectReport/readAll', ProjectReportController.readAll)
router.post('/projectReport/create', ProjectReportController.create)
router.put('/projectReport/update', ProjectReportController.update)
router.put('/projectReport/delete', ProjectReportController.delete)

//Rutas ProjectBeneficiaryRelationship APIs
router.get('/beneficiaryRelationship/readAll', ProjectBeneficiaryRelationshipController.readAll)
router.post('/beneficiaryRelationship/create', ProjectBeneficiaryRelationshipController.create)
router.put('/beneficiaryRelationship/update', ProjectBeneficiaryRelationshipController.update)
router.put('/beneficiaryRelationship/delete', ProjectBeneficiaryRelationshipController.delete)

//*Rutas Cargo Economico */
router.post('/cargoEconomico/create', CargoEconomicoController.createCargoEconomico)

//Rutas Pagos APIs
router.get('/Pago/readAll', PagoController.readAll)
router.post('/Pago/create', PagoController.createPago)
router.post('/Pago/delete', PagoController.delete)

//Rutas pagos APIs, multiples
router.post('/PagoM/create', PagoMultipleController.createPago);



//*Rutas Caja */
router.post('/cash/readAll', Cash.readAll)
router.post('/cash/create', Cash.create)
router.put('/cash/update', Cash.update)
router.post('/cash/delete', Cash.delete)

//*Rutas Cierre de caja */
router.post('/closeCashier/readAll', CloseCashier.readAll)
router.post('/closeCashier/create', CloseCashier.create)
router.put('/closeCashier/update', CloseCashier.update)
router.post('/closeCashier/delete', CloseCashier.delete)
router.post('/closeCashier/getActual', CloseCashier.getActual)
router.post('/closeCashier/checkActual', CloseCashier.checkActual)
router.post('/closeCashier/payments', CloseCashier.getAllPayments)
router.post('/closeCashier/temporalyClose', CloseCashier.temporalyClose)

//Ruta Carga APIs
router.post('/api/producto', CargaController.createproducto)
router.post('/api/createuser', CargaController.createuser)
router.post('/api/createcta', CargaController.createcta)


module.exports = router;
