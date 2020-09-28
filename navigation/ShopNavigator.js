import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductOverViewScreen from '../screens/shop/ProductOverViewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import Colors from '../constants/Colors';

const ProductNavigator = createStackNavigator({
    ProductsOverView: ProductOverViewScreen,
    ProductDetail: ProductDetailsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
});

export default createAppContainer(ProductNavigator);