import React, {useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserDataFromAPI, deleteUserData} from './redux/actions';

const Home = ({userData, fetchUserDataFromAPI, deleteUserData, navigation}) => {
  useEffect(() => {
    fetchUserDataFromAPI();
  }, [fetchUserDataFromAPI]);

  const renderItemComponent = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              handleDelete(item.id);
            }}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigationToUpdateList(item);
            }}>
            <Text style={styles.textContent}>Id: {item.id}</Text>
            <Text style={[styles.textContent, {paddingVertical: 15}]}>
              Title: {item.title}
            </Text>

            <Text style={styles.textContent}>Description: {item.body}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const separateItem = () => {
    return <View style={styles.separator} />;
  };

  const handleDelete = id => {
    deleteUserData(id);
  };

  const navigationToUpdateList = item => {
    navigation.navigate('update', {item: item});
  };

  return (
    <View style={styles.container}>
      <View style={{marginVertical: 15}}>
        <FlatList
          data={userData}
          renderItem={renderItemComponent}
          ItemSeparatorComponent={separateItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  textContent: {
    fontSize: 20,
    color: 'white',
  },

  deleteText: {
    fontSize: 16,
    color: 'red',
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  deleteButton: {
    alignItems: 'flex-end',
  },
});

const mapStateToProps = state => ({
  userData: state.user.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDataFromAPI: bindActionCreators(fetchUserDataFromAPI, dispatch),
  deleteUserData: bindActionCreators(deleteUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
