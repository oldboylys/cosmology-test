import { create } from 'zustand'

const initAsset = {
    assetList: [],
    selectedChain: {}
}

export const useAssets = create((set, get) => ({
  ...initAsset,
  setAssetList: (assetList: any) => set({ assetList }),
  getAssetList: () => {
    return get().assetList
  },

  setSelectedChain: (setSelectedChain: any) => set({ setSelectedChain }),
  getSelectedChain: () => {
    return get().selectedChain
  }
}))
export default useAssets
