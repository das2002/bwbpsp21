import React, {Component} from 'react';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageContainer, LoginImg, LoginInput, LoginHeader, LoginButton, LoginButtonText, LoginText } from './styles';
import { getUser } from '@utils/airtable/requests';
import { UserRecord } from '@utils/airtable/interface';
import { GlobalContext } from '@components/ContextProvider';
import { UserMock } from '@utils/airtable/mocks';


interface LoginScreenState {
  user: UserRecord;
}

interface LoginScreenProps {
  navigation: StackNavigationProp;
}

/**
 * Uh oh! There's a frontend bug in this code. it looks like anyone can log-in.
 *
 * 1. If a user click's Log In without providing credentials it
 *    should alert the user of an incorrect username or password
 * 2. If a user click's Log i with providing incorrect credentials it should
 *    also alert the suser of an incorrect username or password
 *
 * TIPS:
 * - Shake your phone to reload the app!
 * - Hit Command + S in VSCode to save your code. The simulator will automatically reload.
 */
export default class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
  static contextType = GlobalContext;

  constructor(props: LoginScreenProps) {
    super(props);
    this.state = {
      user: { ...UserMock },
    };
  }

  
  async login(): Promise<void> {
    const user = this.state.user //await getUser(this.state.user); //so even if we don't set anything here, its still rendering a user 
    /*const createTwoButtonAlert = () =>
      Alert.alert(
        "Login Error",
        "Username or Password is incorrect",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );*/
    console.log(user) 
    if (user.uname != "" && user.password != "") {
      //if (user.uname == getUser(this.state.user).uname)
      console.log('entered')
      console.log(user.uname)
      console.log(user.password) 
      if(user.uname == 'jen' && user.password == "coldbrew09") {
        await this.context.setUser(await getUser(user));
        this.props.navigation.navigate('App');
      }      
    } else {
      console.log('Error');
      //createTwoButtonAlert;
      //alert.show('Incorrect username or password.');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1 }}>
          <ImageContainer>
            <LoginImg source={require('@assets/imgs/colored_icon.png')} resizeMode="center" />
          </ImageContainer>
          <LoginHeader>Welcome</LoginHeader>
          <LoginText>Username</LoginText>
          <LoginInput
            autoCapitalize="none"
            onChangeText={(text): void =>
              this.setState({
                user: {...this.state.user, uname: text.trim().toLowerCase() },
              })
            }
            value={this.state.user.uname}
          />

          <LoginText>Password</LoginText>
          <LoginInput
            secureTextEntry
            onChangeText={(text): void =>
              this.setState({
                user: { ...this.state.user, password: text },
              })
            }
            value={this.state.user.password}
            
          />

          <LoginButton onPress={(): Promise<void> => this.login()}>
            <LoginButtonText>Log In</LoginButtonText>
          </LoginButton>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
