import React from 'react';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';


export default function AppHeader(props) {
    return (
        <Header style={{ backgroundColor: 'purple' }}>
            {props.hideBack && <Left>
                <Button transparent onPress={props.backFunction}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>}

            <Body style={!props.hideBack ? { paddingLeft: 15, } : null}>
                <Title>{props.title}</Title>
            </Body>

            <Right>
                <Button transparent onPress={props.rightIconOnPress}>
                    <Icon name={props.rightIconName} type={props.rightIconType} style={{ fontSize: 30, }} />
                </Button>
            </Right>
        </Header>
    );
}

