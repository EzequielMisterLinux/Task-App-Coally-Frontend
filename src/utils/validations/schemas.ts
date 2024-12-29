import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    'Password must include at least one letter and one number'
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const registerSchema = z.object({
  names: z.string().min(1, 'Name is required'),
  lastnames: z.string().min(1, 'Last name is required'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  email: emailSchema,
  password: passwordSchema,
  profileImage: z.instanceof(File).optional()
});
