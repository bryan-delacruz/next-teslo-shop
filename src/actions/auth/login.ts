"use server"
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log({
      formDataObj: Object.fromEntries(formData),
    })
    // await sleep(2)

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect:false,
    });

    return "Success"

  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'UnknowError.';
      }
    }
    return 'UnknowError.';
    // throw error;
  }
}