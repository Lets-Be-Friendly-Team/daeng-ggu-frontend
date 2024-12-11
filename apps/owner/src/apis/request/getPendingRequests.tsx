// src/apis/request/getPendingRequests.ts

import { APIClient } from '@daeng-ggu/shared';

import { DefaultResponse } from '@/types/api.ts';

export interface PetProfile {
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode?: string;
  isVisitRequired: boolean;
  lastGroomingDate?: string;
  desiredDate1?: string;
  desiredDate2?: string;
  desiredDate3?: string;
  desiredRegion?: string;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
  createdAt: string;
  majorBreedCode: string;
  estimateList: Estimate[];
  customerName: string;
  phone: string;
  address: string;
  subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreed: string;
  specialNotes: string;
}

export interface Estimate {
  estimateId: number;
  designerId: number;
  designerName: string;
  designerImageUrl: string;
  estimatePrice: number;
  petId: number;
  petName: string;
  createdAt: string;
  designerAddress?: string; // Optional based on the dummy data
}
const getPendingRequests = async (): Promise<PetProfile[]> => {
  const response = await APIClient.get<DefaultResponse<PetProfile>>('/daengggu/bid/estimate/customer');
  console.log('Fetched Pending Requests:', response);
  return response.data;
};

export default getPendingRequests;
