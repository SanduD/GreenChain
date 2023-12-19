export default {
  expo: {
    name: 'Login',
    slug: 'Login',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    plugins: ['@react-native-google-signin/google-signin'],
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.sancript.firebasesignin',
      googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.sancript.firebasesignin',
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '193ee587-3e1e-4d35-a2a3-521c34c1847c',
      },
    },
  },
};
