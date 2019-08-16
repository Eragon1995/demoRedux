import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class StargazersScreen extends Component {
    state = {
        username: navigation.getParam('userName', 'john'),
        repos: [],
    }

    _getUserRepos = (username) => {
        username = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${username}/followers`; 
        return fetch(url).then((res) => res.json());
      }

    _handleSubmit = () => {
    this._getUserRepos(this.state.username)
        .then((res) => {
        this.setState({repos: res});
        });
    }
    _renderRepos = () => {
        return (
          <ScrollView>
            <SafeAreaView>
            <Text style={styles.textName}>Số lượng repo: {JSON.stringify(this.state.repos.length)}</Text>
            {
              this.state.repos.map((repo, i) => {
                return (
                  <View style={styles.viewText} key={i}>
                    <Text style={styles.textName}>{i+1}, {JSON.stringify(repo.login)}</Text>
                    <Image
                        style={styles.image}
                        source={{uri: repo.avatar_url}}
                    />
                  </View>
                )
              })
            }
            </SafeAreaView>
          </ScrollView>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
    viewText: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#d6d7da',
      flex: 1,
      padding: 10,
      marginBottom: 10,
    },
    textName: {
      padding: 5,
      flex: 1,
    },
    image: {
      flex: 1,
      width: 16,
      height: 16,
      marginLeft: 5,
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
    },
    input: {
      width: screenWidth - 20,
      height: 38,
      padding: 4,
      fontSize: 16,
      borderColor: '#3a3a3a',
      borderWidth: 1,
      borderRadius: 8,
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor:'#263238',
      borderColor: '#263238',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      alignSelf: 'center',
    }
  });