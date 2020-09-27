import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductOverViewScreen from '../screens/shop/ProductOverViewScreen';
import Colors from '../constants/Colors';

const ProductNavigator = createStackNavigator({
    ProductsOverView: ProductOverViewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
});

export default createAppContainer(ProductNavigator);