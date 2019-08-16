import { createStackNavigator } from 'react-navigation';
import Detail from './StargazersScreen';

const AppNavigator = createStackNavigator({
  Detail: { screen: Detail },
});

export default AppNavigator;