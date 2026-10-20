import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EcomHomePage from '../../screens/ecommerce/ecomHomePage/EcomHomePage';
import ProductWishlist from '../../screens/ecommerce/productWishlist/ProductWishlist';
import CustomDrawer from './customDrawer/CustomDrawer';
import OrderHistory from '../../screens/ecommerce/orderHistory/OrderHistory';
const Drawer = createDrawerNavigator();
const ECommerceDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, unmountOnBlur: true}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="homePage" component={EcomHomePage} />
      <Drawer.Screen name="ProductWishlist" component={ProductWishlist} />
      <Drawer.Screen name="orderHistory" component={OrderHistory} />
    </Drawer.Navigator>
  );
};

export default ECommerceDrawer;
