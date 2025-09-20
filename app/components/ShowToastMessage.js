import React from 'react';
import Toast from 'react-native-toast-message';

export const ShowToastMessage = (message, type = 'error') => {
    Toast.show({
        text1: message,
        type,
        position: 'bottom',
    });
};
