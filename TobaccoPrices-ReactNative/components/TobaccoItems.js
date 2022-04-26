import React from 'react';
import { Modal, ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import { styles } from '../styles/TobaccoItems';

export default class TobaccoItems extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            isLoading: true,
            modalVisible: false
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    async getItems() {
        try {
            const response = await fetch('http://dancsdaniel.ddns.net:3000/priceList');
            const json = await response.json();
            this.setState({ data: json });
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        const { data, isLoading } = this.state;
        const { modalVisible } = this.state;
        
        return (
            <View style={{ flex: 1, padding: 24, backgroundColor:"#ad8c6a" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Dohány adatok!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Bezár</Text>
                            </Pressable>
                    </View>
                </View>
                </Modal>
                {isLoading ? <ActivityIndicator/> : (
                    
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <View>
                            <Text style={{marginBottom:5,}}>{item.name}: {item.price}FT</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => this.setModalVisible(true)}
                                >
                                    <Text style={styles.textStyle}>Bővebben</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    }
}


  