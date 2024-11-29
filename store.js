import { create } from 'zustand';

const useStore = create((set) => ({

  base64Image: null,
  setBase64Image: (image) => set({ base64Image: image }),

  prompt: 'Describe this image',
  setPrompt: (newPrompt) => set({ prompt: newPrompt }),

  transcript: '',
  setTranscript: (newTranscript) => set({ transcript: newTranscript }),

  loading: false,
  setLoading: (value) => set({ loading: value }),

}));

export default useStore;
