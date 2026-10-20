import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import {color} from '../../theme';

const {width, height} = Dimensions.get('window');

const CityModalComp = ({
  visible,
  onClose,
  onSelect,
  states,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  states: string[];
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState(states);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredCities(states);
    } else {
      const lowerText = searchText.toLowerCase();
      const filtered = states.filter(city =>
        city.toLowerCase().includes(lowerText),
      );
      setFilteredCities(filtered);
    }
  }, [searchText, states]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.backdrop}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <Text style={styles.header}>Select City</Text>

          <TextInput
            placeholder="Search city..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />

          <FlatList
            data={filteredCities}
            
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: color.inputBackground,
    borderRadius: 10,
    padding: 20,
    maxHeight: height * 0.6,
  },
  header: {
    fontSize: 18,
    color: color.white,
    fontWeight: '600',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor:color.inputBackground,
    borderWidth:1,
    borderColor: '#ccc',
    color: '#fff',
    borderRadius:6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    marginTop:10,
    fontSize: 15,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: color.border,
  },
  itemText: {
    color: color.white,
    fontSize: 16,
  },
});

export default CityModalComp;
