import React from 'react';
import { Platform, Button, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shpo/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsAction from '../../store/actions/productsActions';

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        })
    }

    const deleteHandler = id => {

        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productsAction.deleteProduct(id));
                }
            }
        ])
    };


    return (
        <FlatList
            keyExtractor={item => item.id}
            data={userProducts}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { }}
                >
                    <Button
                        title="Edit"
                        color={Colors.primaryColor}
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        title="Delete"
                        color={Colors.primaryColor}
                        onPress={() => deleteHandler(itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === "android" ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }}
            />
        </HeaderButtons>)
    }
}


export default UserProductScreen;
