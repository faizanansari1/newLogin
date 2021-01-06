import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, } from 'react-native';
import { Container, Content, Card, CardItem, Body, Icon, Item, Input, Button, Text, Toast, Root, Thumbnail, Spinner, } from 'native-base';
import Axios from 'axios';
import AppHeader from '../Header';
import { connect } from 'react-redux';
import { getUserProfile } from '../../action/actionCreater';

const mapStateTopProps = state => {
    return {
        userPro: state.userPro
    };
}

const mapDispatchToProps = dispatch => ({
    getUserProfile: () => dispatch(getUserProfile())
})

class FriendList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            modalVisible: false,
            editModal: false,
            name: '',
            index: null,
            detailModal: false,
            detail: [],
            index: null,
            loader: true
        }
    }

    componentDidMount() {
        // Axios.get('https://demo6258370.mockable.io/users').then((response) => {
        //     this.setState({ friends: response.data.uses_profile, loader: false })
        // }).catch(err => console.log(err))
        this.props.getUserProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.userPro.isLoading) {
            this.setState({friends: nextProps.userPro.userPro.uses_profile})
        }
    }

    openModal = () => {
        console.log('myModal Hit')
        this.setState({ modalVisible: true, name: '' })
    }

    onSubmit() {
        console.log('hittte')
        let obj = {
            name: this.state.name,
        }
        this.setState({ friends: this.state.friends.concat(obj), modalVisible: false })
    }

    onEdit = (index) => {
        var number = 5 + 6;
        var array = [...this.state.friends];
        console.log('Arry frind:', array[index])
        this.setState({ name: array[index].name, editModal: true, index: index })
    }

    onUpdate() {
        var array = [...this.state.friends];
        array[this.state.index].name = this.state.name;
        this.setState({ friends: array, editModal: false })
    }

    onDelet(index) {
        console.log('hit delete')
        var array = [...this.state.friends];
        array.splice(index, 1);
        this.setState({ friends: array });

        Toast.show({
            text: "Removed Successfully",
            buttonText: "Okay",
            type: "danger",
            duration: 2000
        });
    }
    // onUpdate() {
    //     const { index } = this.state;
    //     // console.log("submit index: ", index)
    //    v ar array = [...this.state.friends];
    //     array[index].name = this.state.name;
    //     this.setState({ friends: array })
    // }

    onDetail(index) {
        var array = [...this.state.friends];
        // console.log("array new Index ==>", array[index])
        this.setState({ detail: array[index], detailModal: true }, () => {
            console.log('my details :', this.state.detail)
        })
    }

    render() {
        return (
            <Root>
                <Container>
                    <AppHeader
                        title="Friend List"
                        hideBack={true}
                        backFunction={() => this.props.navigation.goBack()}
                        rightIconType="Ionicons"
                        rightIconName="md-person-add"
                        rightIconOnPress={this.openModal}
                    />
                    <Content contentContainerStyle={{ minHeight: '100%' }}>
                        <View style={styles.container}>

                            {this.state.friends.map((item, index) => {
                                return (
                                    <Card key={index}>
                                        <CardItem>
                                            <Body>
                                                <View style={styles.cardView}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                        <Text style={styles.text}>{item.name}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>

                                                        <TouchableOpacity onPress={() => this.onDetail(index)}>
                                                            <Icon type="MaterialCommunityIcons" name="account-card-details-outline" style={styles.editIcon} />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={() => this.onEdit(index)}>
                                                            <Icon type="AntDesign" name="edit" style={styles.editIcon} />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            onPress={() => this.onDelet(index)}>
                                                            <Icon type="MaterialCommunityIcons" name="delete-variant" style={{ color: 'red' }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                );
                            })}


                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Add Friend</Text>
                                    <Item>
                                        <Input
                                            value={this.state.name}
                                            placeholder="Name"
                                            onChangeText={(val) => this.setState({ name: val })}
                                        />

                                    </Item>
                                    <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <Button onPress={() => this.onSubmit()}>
                                            <Text >Submit</Text>
                                        </Button>
                                        <Button onPress={() => this.setState({ modalVisible: false })}>
                                            <Text>Cancle</Text>
                                        </Button>
                                    </View>

                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.editModal}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Edit Friend</Text>
                                    <Item>
                                        <Input
                                            value={this.state.name}
                                            placeholder="Name"
                                            onChangeText={(val) => this.setState({ name: val })}
                                        />

                                    </Item>
                                    <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <Button onPress={() => this.onUpdate()}>
                                            <Text >Submit</Text>
                                        </Button>
                                        <Button onPress={() => this.setState({ editModal: false })}>
                                            <Text>Cancle</Text>
                                        </Button>
                                    </View>

                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.detailModal}
                        >
                            <View style={styles.DetailCenterView}>

                                <View style={styles.DetailmodalView}>
                                    <TouchableOpacity
                                        style={styles.detailCancle}
                                        onPress={() => this.setState({ detailModal: false })}
                                    >
                                        <Icon type="AntDesign" name="closesquareo" style={{ color: 'purple', fontSize: 22 }} />
                                    </TouchableOpacity>

                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Thumbnail source={{ uri: this.state.detail.image }} style={styles.image} />

                                        <View style={styles.innerDetail}><Text style={styles.innerText}>{this.state.detail.name}</Text></View>
                                        <View style={styles.innerDetail}><Text style={styles.innerText}>{this.state.detail.country}</Text></View>
                                        <View style={styles.innerDetail}><Text style={styles.innerText}>{this.state.detail.city}</Text></View>
                                        <View style={styles.innerDetail}><Text style={styles.innerText}>{this.state.detail.age}</Text></View>

                                    </View>
                                </View>

                            </View>
                        </Modal>

                    </Content>
                    {this.props.userPro.isLoading && <View style={styles.loaderContainer}><Spinner color='purple' /></View>}
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 5
    },
    container: {
        flex: 1,
        padding: 15,
    },
    cardView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 18,
    },
    editIcon: {
        marginRight: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'

    },

    DetailCenterView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    DetailmodalView: {

        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#9400D3",
        width: '70%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 5,
    },
    innerDetail: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    innerText: {
        fontSize: 18,
    },
    detailCancle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 12,
        top: 12,
        elevation: 2,
    }

});

export default connect(mapStateTopProps, mapDispatchToProps)(FriendList);
