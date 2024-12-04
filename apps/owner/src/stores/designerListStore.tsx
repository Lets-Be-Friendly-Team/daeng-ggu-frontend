import { create } from 'zustand';

import { DesignerType } from '@/components/DesignerInfo/DesignerData';

interface DesignerListState {
  designerList: DesignerType[];
  popularList: DesignerType[];
  premiumSpList: DesignerType[];
  premiumFcList: DesignerType[];
  premiumStList: DesignerType[];
  setLists: (_data: {
    designerList: DesignerListState['designerList'];
    popularList: DesignerListState['popularList'];
    premiumSpList: DesignerListState['premiumSpList'];
    premiumFcList: DesignerListState['premiumFcList'];
    premiumStList: DesignerListState['premiumStList'];
  }) => void;
}
const useDesignerListStore = create<DesignerListState>((set) => ({
  designerList: [],
  popularList: [],
  premiumSpList: [],
  premiumFcList: [],
  premiumStList: [],
  setLists: (_data) => set(_data),
}));
export default useDesignerListStore;
