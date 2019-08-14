import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class App extends Component {
  state = {
    username: '',
    repos: [],
  }

  _handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }

  _getUserRepos = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  }

  _handleSubmit = () => {
    this._getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
      });
  }

  _showAlert = () => {
    Alert.alert(
       'Load More'
    )
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
                <Text style={styles.textName}>{i+1}, {JSON.stringify(repo.full_name)}</Text>
                <View style={styles.textName}>
                  <Text style={styles.textName}>Star: {JSON.stringify(repo.stargazers_count)}</Text> 
                  <Image style={styles.image} source={require('./asset/star.png')} />
                </View>
                <Text style={styles.textName}>Language: {JSON.stringify(repo.language)} </Text>
              </View>
            )
          })
        }
        {/* if (this.state.repo.length > 30) {
          
        } */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._showAlert}
          >
          <Text style={styles.buttonText}>Load More</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          onChange={this._handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._handleSubmit}
          >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        { this._renderRepos() }
      </View>
    );
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

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import SearchBar from './components/SearchBar/SearchBar';
// import SearchResults from './components/SearchResults/SearchResults';

// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import rootReducer from './reducers_index';

// const store = createStore(rootReducer);
// store.subscribe(() => console.log('store', store.getState()));

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <View style={styles.container}>
//           <SearchBar/>
//           <SearchResults/>
//         </View>
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });