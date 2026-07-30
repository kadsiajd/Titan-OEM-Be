import prisma from '../../shared/db/prisma';
import { CreateEnquiryInput, EnquiryResponse } from './enquiries.interface';

class EnquiryDao {
  async create(input: CreateEnquiryInput): Promise<EnquiryResponse> {
    return prisma.enquiry.create({
      data: {
        name: input.name,
        company: input.company,
        email: input.email,
        phone: input.phone,
        message: input.message,
      },
    });
  }
}

export default new EnquiryDao();
