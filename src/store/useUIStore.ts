import { create } from 'zustand'

type ModalType = 'post' | 'task' | 'project' | null

interface UIStore {
  modalType: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  modalType: null,
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null })
}))
