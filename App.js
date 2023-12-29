import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState(null);

  const getDataUsingSimpleGetCall =  () => {
    axios
      .get('https://fakestoreapi.com/products?sort=desc')
      .then(function (response) {
        setData(response.data);
       })
       .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  };
  const rederItem = ({item}) => {
    return (
      <View
        style = {{
          padding: 10,
          marginVertical: 8,
          marginHorizontal: 16,
          backgroundColor: 'green'
        }} >
          <Text style = {{fontSize: 18}}>{item.id}</Text>
          <Text style = {{fontSize: 14}}>{item.title}</Text>
          <Text style = {{fontSize: 14}}>{item.price}</Text>
          <Text style = {{fontSize: 14}}>{item.description}</Text>
          <Text style = {{fontSize: 14}}>{item.category}</Text>
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonStyle} onPress={getDataUsingSimpleGetCall}>
        <Text style={styles.buttonText}>Simple Get Call</Text>
      </TouchableOpacity>

      <SafeAreaView
      style= {{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <FlatList
        data={data}
        renderItem={rederItem}
        keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#f0ffff',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7fff00',
    borderRadius: 5,
    width: '100%',
  },
  dataHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 14,
  },
});

export default App;