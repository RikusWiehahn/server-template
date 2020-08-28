import { ServiceResponseWithEvents, Err } from '../config/interfaces';

export const signIn = async ({
  email,
  password,
}: {
  email?: string;
  password?: string;
}): Promise<ServiceResponseWithEvents> => {
  console.log('%cfunction', 'color: magenta;', 'signIn');
  try {
    // ...
    return {
      success: true,
      message: 'Success',
      output: { token: 'asdfasdfasdf' },
      events: [],
    };
  } catch (e) {
    console.log(e);
    return { ...Err, message: e.message };
  }
};
