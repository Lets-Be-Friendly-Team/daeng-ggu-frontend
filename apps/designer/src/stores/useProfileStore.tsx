import { create } from 'zustand';

import { DesignerData, FileData } from '@/pages/RegisterProfile/RegisterProfileData';
// import useDesignerIdStore from './useDesignerIdStore';

interface ProfileState {
  profileData: DesignerData;
  setProfileData: (_newData: Partial<DesignerData>) => void; // Partial로 일부만 업데이트 가능
  fileData: FileData;
  setFileData: (_newData: Partial<FileData>) => void;
}
// const { designerId } = useDesignerIdStore();
const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    designerId: 0,
    // designerId: 2,
    newImgUrl: '',
    nickname: '',
    address1: '',
    address2: '',
    detailAddress: '',
    introduction: '',
    phone: '',
    providedServiceList: [],
    dayOff: [],
    // businessNumber: '',
    businessNumber: '12345',
    // businessIsVerified: '',
    businessIsVerified: 'N',
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
