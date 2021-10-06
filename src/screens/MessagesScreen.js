import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import FormInput from '../components/FormInput';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  MessageTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import firebase from '../utils/Firebase';

const MessagesScreen = ({navigation, emailId}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [chatDetail, setChatDetail] = useState([]);
  const db = firebase.database();

  useEffect(async () => {
    if (chatDetail == null || chatDetail.length == 0) {
      const getDetail = await db.ref('user').child(emailId.split('@')[0]).get();

      let chat = [];
      getDetail.forEach(data => {
        chat.push(data.val());
      });
      setChatDetail(chat);
      console.log(chat);
    }
  }, []);

  const handleModalPress = async () => {
    setModalVisible(!modalVisible);
    let isEmail = -1;
    if (chatDetail != null) {
      console.log(chatDetail);
      isEmail = chatDetail.findIndex(val => val.email == email);

      //   chatDetail.map(data => {
      //     console.log(data.email == email);

      //     if (data.email == email) {
      //       isEmail = true;

      //       // break;
      //       return;
      //     }
      //   });
      // }
    }
    console.log(isEmail);
    if (isEmail != -1) {
      alert('Chat already added');
      console.log('already Email');
      return;
    }

    let newDate = Date.now();
    await db
      .ref('user')
      .child(emailId.split('@')[0])
      .push({
        name: email.split('@')[0],
        email: email,
        chatId: newDate,
      });
    await db
      .ref('user')
      .child(email.split('@')[0])
      .push({
        name: emailId.split('@')[0],
        email: emailId,
        chatId: newDate,
      });
    let tempDetail = [...chatDetail];
    tempDetail.push({
      name: email.split('@')[0],
      email: email,
      chatId: newDate,
    });
    setChatDetail(tempDetail);
  };

  return (
    <Container>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FormInput
                labelValue={email}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModalPress()}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Add Contact</Text>
        </Pressable>
      </View>

      {!modalVisible && (
        <FlatList
          data={chatDetail}
          keyExtractor={item => item.email}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {chatId: item})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={require('../../assets/users/dp.png')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    {/* <MessageTime>4 mins ago</MessageTime> */}
                  </UserInfoText>
                  <MessageText>{item.email}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MessagesScreen;
