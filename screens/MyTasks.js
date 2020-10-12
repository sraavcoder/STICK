import React from 'react';
import { StyleSheet, Text, View, ListItem, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import  MyHeader  from '../components/MyHeader'
var use = false;


export default class MyTasks extends React.Component {

    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            search: '',
            value: '',
            allTransactions: [],
            lastTransaction: null,
            doc: '',
        }
    }

    fetchTransaction = async () => {
        if (use == true) {
            const query2 = await db.collection('requestedItems').startAfter(this.state.lastTransaction).limit(1).get();

            query2.docs.map((doc) => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastTransaction: doc,
                });
            });

        }

    }

    retriveStory = async () => {
        use = true;

        this.setState({
            allTransactions: []
        })
        // db.collection('user').doc(doc.id).collection('Tasks').doc(uniqueID)
        const query = await db.collection('user').doc(this.state.doc).collection('Tasks').limit(11).get();

        query.docs.map((doc) => {
            this.setState({
                allTransactions: [...this.state.allTransactions, doc.data()],
                lastTransaction: doc,
            });
        });

    };

    async componentDidMount() {

        await db.collection('user').where('User_Name', '==', this.state.userID)
            .onSnapshot(data => {
                data.forEach(doc => {
                    this.setState({
                        doc: doc.id
                    })
                })
            })
    }


    render() {
        return (
            <View>
                <MyHeader title="Stick To Your Plan" navigation={this.props.navigation} />
                <TouchableOpacity style={{ backgroundColor: '#f47b9d', height: 30, borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
                    onPress={() => { this.retriveStory() }}
                >
                    <Text style={{ textAlign: 'center', color: 'white', paddingTop: 2 }}>Show All</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.allTransactions}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 2, borderColor: '#a5a5a5', }}>

                            <View style={{ marginLeft: 10 }} >
                                <Text style={{ paddingTop: 10, fontSize: 15, paddingBottom: 3 }}>{<b>{item.HabitName.toUpperCase()}</b>}</Text>
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center', width: 200, backgroundColor: '#f47b9d', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, margin: 10, height: 25, borderRadius: 5 }}
                                onPress={() => {
                                    this.props.navigation.navigate('TaskDetails', { "details": item })
                                }}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center' }} >View More Details</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.fetchTransaction}
                    onEndReachedThreshold={0.7}
                />
            </View>
        );
    }

}

