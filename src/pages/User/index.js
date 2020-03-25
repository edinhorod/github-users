import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

export default class User extends Component {
    // static navigationOptions = ({ params }) => ({
    //     title: params.user.name,
    // });

    constructor(props) {
        super(props);
        this.state = {
            stars: [],
            loading: false,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        const { user } = this.props.route.params;
        // const user = navigation.getParam('user').name;
        const response = await api.get(`/users/${user.login}/starred`);
        this.setState({
            stars: response.data,
            loading: false,
        });
    }
    render() {
        const { stars, loading } = this.state;
        const { user } = this.props.route.params;

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {loading ? (
                    <ActivityIndicator color="#999" />
                ) : (
                    <Stars
                        data={stars}
                        keyExtractor={(star) => String(star.id)}
                        renderItem={({ item }) => (
                            <Starred>
                                <OwnerAvatar
                                    source={{ uri: item.owner.avatar_url }}
                                />
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}
                    />
                )}
            </Container>
        );
    }
}
