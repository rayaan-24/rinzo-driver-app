import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * Utility class to handle camera and gallery picker actions.
 * Keeps image picker logic decoupled from screen presentation views.
 */
export class ImageManager {
  
  /**
   * Request camera permission
   */
  static async requestCameraPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Rinzo needs camera permissions to take a new profile photo. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }

  /**
   * Request gallery/media library permission
   */
  static async requestGalleryPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Gallery Permission Required',
        'Rinzo needs photo library permissions to select a profile photo. Please enable it in your settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }

  /**
   * Launch camera to capture image
   * Returns image URI if successful, null if cancelled or failed
   */
  static async takePhoto(): Promise<string | null> {
    try {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
      return null;
    }
  }

  /**
   * Launch gallery to select image
   * Returns image URI if successful, null if cancelled or failed
   */
  static async chooseFromGallery(): Promise<string | null> {
    try {
      const hasPermission = await this.requestGalleryPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Error picking photo from gallery:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
      return null;
    }
  }
}
