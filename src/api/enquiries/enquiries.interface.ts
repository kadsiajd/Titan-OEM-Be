import { CreateEnquiryBody } from './enquiries.schema';

export type CreateEnquiryInput = CreateEnquiryBody;

export interface EnquiryResponse {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string | null;
  createdAt: Date;
}
