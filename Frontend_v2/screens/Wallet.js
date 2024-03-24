/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

const projectId = 'b14f479057c1f8360f22b46dcf75f24b';

const providerMetadata = {
  name: 'GreenChain',
  description: 'Welcome to greenChain',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};
const Wallet = () => {
  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

  const onPress = () => {
    if (isConnected) {
      provider.disconnect();
    } else {
      open();
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => open()} style={{ marginTop: 16 }}>
        <Text>{isConnected ? address : 'Connect'}</Text>
      </Pressable>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Wallet;
