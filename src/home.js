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
        <TouchableOpacity
          onPress={() => {
            navigationToUpdateList(item);
          }}>
          <Text style={styles.textContent}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDelete(item.id);
          }}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});

const mapStateToProps = state => ({
  userData: state.user.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDataFromAPI: bindActionCreators(fetchUserDataFromAPI, dispatch),
  deleteUserData: bindActionCreators(deleteUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
