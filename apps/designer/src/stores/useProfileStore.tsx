import { create } from 'zustand';

import { DesignerData } from '@/pages/RegisterProfile/RegisterProfileData';

interface ProfileState {
  profileData: DesignerData;
  setProfileData: (_newData: Partial<DesignerData>) => void; // Partial로 일부만 업데이트 가능
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    designerImg: null,
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
    introduction: '',
    phone: '',
    providedServices: [],
    possibleBreeds: [],
    dayOff: [],
    businessNumber: '',
    certifications: [],
    workExperience: '',
    portfolioList: [],
  },
  setProfileData: (newData) =>
    set((state) => ({
      profileData: { ...state.profileData, ...newData }, // 기존 데이터 유지하며 업데이트
    })),
}));

export default useProfileStore;
