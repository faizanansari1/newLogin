import React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Icon, Toast, Root } from 'native-base';
import Axios from 'axios';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getUser } from '../../action/actionCreater';


const mapStateTopProps = state => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser())
})

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            userName: 'admin',
            passWord: 'admin',
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.props.getUser()
    }
    componentWillReceiveProps(nextprops){
        if(!nextprops.user.isLoading){
            console.log('Done')
            this.setState({users: nextprops.user.user.users}, () => {
                console.log("state val: ", this.state.users)
            })
        }
        console.log('new Data ===>', nextprops.user.user.users);

    }

    onSubmit = () => {
        const verification = this.state.users.filter((item) => item.username === this.state.userName && item.password === this.state.passWord)
        if (verification.length > 0) {
            console.log('Login Successfully');
            this.props.navigation.navigate('Dashboard');
            AsyncStorage.setItem('userID', verification[0].id);
        } else {
            Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                duration: 2000
            });
        }
    }


    render() {
        return (
            <Root>
                <Container>
                    <Content contentContainerStyle={{ minHeight: '100%' }}>
                        <View style={styles.container}>
                            <View>
                                <Icon type="SimpleLineIcons" name="login" style={{ fontSize: 45, marginBottom: 30, color: 'purple' }} />
                            </View>
                            <Form style={styles.formStyle}>
                                <Item floatingLabel last style={{ paddingBottom: 5, }}>
                                    <Label style={{ color: 'purple' }}>Username</Label>
                                    <Input
                                        value={this.state.userName}
                                        autoCapitalize='none'
                                        onChangeText={(val) => {
                                            this.setState({ userName: val })
                                        }}
                                    />
                                </Item>
                                <Item floatingLabel last style={{ paddingBottom: 5 }}>
                                    <Label style={{ color: 'purple' }}>Password</Label>
                                    <Input
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        value={this.state.passWord}
                                        onChangeText={(val) => {
                                            this.setState({ passWord: val })
                                        }}
                                    />
                                </Item>
                                <Button block style={styles.btn} onPress={this.onSubmit}>
                                    <Text style={styles.btnText}>Login</Text>
                                </Button>

                            </Form>

                        </View>

                    </Content>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    formStyle: {
        width: '90%',
        alignItems: "center",
    },

    btn: {
        marginTop: 30,
        color: 'purple',
        backgroundColor: 'purple'
    },
    btnText: {
        color: 'white',
        fontSize: 18
    }
});

export default connect(mapStateTopProps, mapDispatchToProps)(LoginScreen);
