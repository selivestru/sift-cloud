import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  ORIGIN: z
    .string()
    .transform((value) => value.split(',').map((origin) => origin.trim()))
    .pipe(
      z
        .array(
          z
            .url({
              protocol: /^https?$/,
            })
            .refine((value) => new URL(value).origin === value, {
              message: 'Expected a valid HTTP(S) origin',
            }),
        )
        .min(1),
    )
    .default(['http://localhost:3000']),
})

export type Env = z.infer<typeof envSchema>
