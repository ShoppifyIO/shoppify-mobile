import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Friend } from '../models/friend';
import { Ionicons } from '@expo/vector-icons';

interface FriendsShareModalProps {
    visible: boolean;
    onClose: () => void;
    onShareConfirmed: (selectedFriends: Friend[]) => void;
    friends: Friend[];
}

const FriendsShareModal: React.FC<FriendsShareModalProps> = ({ visible, onClose, onShareConfirmed, friends }) => {
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

    const handleShare = () => {
        onShareConfirmed(selectedFriends);
        onClose();
    };

    const toggleFriendSelection = (friend: Friend) => {
        const isSelected = selectedFriends.some(selected => selected.id === friend.id);
        const newSelectedFriends = isSelected 
          ? selectedFriends.filter(selected => selected.id !== friend.id)
          : [...selectedFriends, friend];
    
        setSelectedFriends(newSelectedFriends);
    };

    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Wybierz znajomych, którym chcesz udostępnić listę:</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={32} color="gray" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.friendItem, selectedFriends.some(selected => selected.id === item.id) && styles.friendItemSelected]}
                            onPress={() => toggleFriendSelection(item)}
                        >
                            <Text style={styles.friendName}>{item.name}</Text>
                            {selectedFriends.some(selected => selected.id === item.id) && (
                                <Ionicons name="checkmark" size={20} color="green" style={styles.checkmarkIcon} />
                            )}
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.button} onPress={handleShare}>
                    <Text style={styles.buttonText}>Udostępnij</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    friendItemSelected: {
        backgroundColor: '#e0f7fa',
    },
    friendName: {
        flex: 1,
        fontSize: 16,
    },
    checkmarkIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#505168',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
    },
});

export default FriendsShareModal;
