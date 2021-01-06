import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import AppHeader from '../Header';
import Axios from 'axios';

export default class AboutScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            user: [],
            loader: true
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userID').then((res) => {
            //    console.log('Get User ID :', res)
            Axios.get('https://demo6258370.mockable.io/users').then((response) => {
                const filderId = response.data.uses_profile.filter((item) => item.id === res);
                this.setState({ user: filderId, loader:false })

            }).catch(err => console.log(err))
        })
    }

    render() {
        return (
            <Container>
                <AppHeader
                    hideBack={true}
                    backFunction={() => this.props.navigation.goBack()}
                    title="About"
                    rightIconType="EvilIcons"
                    rightIconName="user"
                />
                <Content contentContainerStyle={{ minHeight: '100%' }}>
                    <View style={styles.container}>
                        {this.state.user.map((item) => {
                            return (
                                <View style={styles.content}>
                                    <Image source={{ uri: item.image }} style={styles.img} />
                                    <View style={styles.row}>
                                        
                                        <Text style={styles.col}>{item.name}</Text>
                                    </View>
                                    <View style={styles.row}>
                                       
                                        <Text style={styles.col}>{item.country}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>{item.city}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.col}>{item.age}</Text>
                                    </View>
                                </View>
                            );
                        })}

                        {this.state.loader &&  <Spinner color='purple' />}
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
        alignItems: 'center',
        justifyContent:'center',
    },
    content: {
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'purple',
        paddingVertical: 20,
        width: '80%',
        borderRadius:12,
        elevation:3,
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 100,

    },
    row: {
        flexDirection: 'row',
        // width: '100%',
        marginVertical:15,
        paddingHorizontal:20,
        alignItems:'center'
    },
    col: {
        fontSize: 18,

    },
  


});


