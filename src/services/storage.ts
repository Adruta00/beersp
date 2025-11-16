import { uploadData, getUrl, remove } from 'aws-amplify/storage';

export const storage = {
  async uploadImage(file: File, path: string): Promise<string | null> {
    try {
      const result = await uploadData({
        path,
        data: file,
        options: {
          contentType: file.type
        }
      }).result;

      const url = await getUrl({ path: result.path });
      return url.url.toString();
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },

  async getImageUrl(path: string): Promise<string | null> {
    try {
      const url = await getUrl({ path });
      return url.url.toString();
    } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
    }
  },

  async deleteImage(path: string): Promise<boolean> {
    try {
      await remove({ path });
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
};