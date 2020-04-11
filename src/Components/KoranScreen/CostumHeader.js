import React, { Component } from "react"
import { Header, Left, Body, Right, Title, Subtitle, Button, Icon, Text } from 'native-base'

class CostumHeader extends Component {
    render() {

        const { title, subtile, isHome, validate, navigation } = this.props
        console.log(subtile)

        return (

            <Header>
                <Left>
                    {
                        (!isHome) &&
                        <Button hasText transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>

                    }

                </Left>
                <Body>
                    <Title style={{ fontSize: 14, textAlign: "center" }}>{title}</Title>
                    {
                        !(subtile === undefined) && <Subtitle style={{ fontSize: 12, textAlign: "center" }}>{subtile}</Subtitle>
                    }

                </Body>
                <Right>
                    {
                        (!isHome) &&

                        <Button hasText transparent onPress={(event) => validate(event)}>
                            <Text style={{ color: "white" }}>Valider</Text>
                        </Button>

                    }
                </Right>
            </Header>

        )
    }
}

export default CostumHeader