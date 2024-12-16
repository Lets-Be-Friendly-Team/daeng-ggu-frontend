import { create } from 'zustand';

import { DesignerData, FileData } from '@/pages/RegisterProfile/RegisterProfileData';

interface ProfileState {
  profileData: DesignerData;
  setProfileData: (_newData: Partial<DesignerData>) => void; // Partial로 일부만 업데이트 가능
  fileData: FileData;
  setFileData: (_newData: Partial<FileData>) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    designerId: Number(localStorage.getItem('designerId')),
    // designerImg: null,
    newImgUrl: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
    introduction: '',
    phone: '',
    providedServices: [],
    dayOff: [],
    businessNumber: '',
    businessIsVerified: '',
    certificationsUrlList: [],
    workExperience: '',
    portfolioList: [],
  },
  setProfileData: (newData) =>
    set((state) => ({
      profileData: { ...state.profileData, ...newData }, // 기존 데이터 유지하며 업데이트
    })),
  fileData: {
    designerImg: null,
    certifications: [],
    portfolioImgList: [],
    video: null,
  },
  setFileData: (newData) =>
    set((state) => ({
      fileData: { ...state.fileData, ...newData },
    })),
}));

export default useProfileStore;
