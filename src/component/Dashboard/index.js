import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import AppHeader from '../Header';



export default class Dashboard extends React.Component {
    render() {
        return (
            <Container>
                <AppHeader
                    title="Dashboard"
                    hideBack={false}
                    rightIconType="FontAwesome"
                    rightIconName="tachometer"
                />
                <Content contentContainerStyle={{ backgroundColor: '#eee', minHeight: '100%' }}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.col}>
                                <Icon style={styles.icon} type="Ionicons" name="ios-home" />
                                <Text style={styles.text}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.col} onPress={() => this.props.navigation.navigate('About')}>
                                <Icon style={styles.icon} type="Octicons" name="info" />
                                <Text style={styles.text}>About</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.col}>
                                <Icon style={styles.icon} type="FontAwesome5" name="servicestack" />
                                <Text style={styles.text}>Services</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.col} onPress={() => this.props.navigation.navigate('Friend')}>
                                <Icon style={styles.icon} type="AntDesign" name="deleteusergroup" />
                                <Text style={styles.text}>Friend</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.col}>
                                <Icon style={styles.icon} type="AntDesign" name="contacts" />
                                <Text style={styles.text}>Contact</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>



                </Content>
            </Container>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom:15,
        justifyContent: 'space-between'
    },

    col: {
        paddingVertical: 10,
        backgroundColor: 'white',
        width: '48%',
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'purple',
        elevation: 6,
    },

    icon: {
        fontSize: 50,
        color: 'purple'
    },
    text: {
        fontSize: 18,
        color: 'purple',
    }

});