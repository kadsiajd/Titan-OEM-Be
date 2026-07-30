import { FastifyReply, FastifyRequest } from 'fastify';
import enquiryDao from './enquiries.dao';
import { createEnquirySchema } from './enquiries.schema';
import { sendSuccess } from '../../shared/utils/response';
import { ValidationError } from '../../shared/errors/AppError';

class EnquiryController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const parsed = createEnquirySchema.safeParse(request.body);

    if (!parsed.success) {
      throw new ValidationError(
        'Validation failed',
        parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }

    const enquiry = await enquiryDao.create(parsed.data);

    return sendSuccess(reply, {
      message: 'Enquiry submitted successfully',
      data: enquiry,
      statusCode: 201,
    });
  }
}

export default new EnquiryController();
