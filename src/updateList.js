import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUserData} from './redux/actions';

const UpdateList = ({route, userData, updateUserData, navigation}) => {
  const item = route.params.item;
  const [body, setBody] = useState(item.body);

  const handleBodyChange = text => {
    setBody(text);
  };

  const handleSave = () => {
    const item = route.params.item;
    const finalItem = {...item, body: body};
    updateUserData(finalItem);
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={5}
        value={body}
        onChangeText={handleBodyChange}
        placeholder="Enter text here..."
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textArea: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 16,
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  userData: state.user.userData,
});

const mapDispatchToProps = dispatch => ({
  updateUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateList);
