import { ServiceResponse } from '../routes/switchboard';

export const testFunction = async ({}: {}): Promise<ServiceResponse> => {
  console.log('%cfunction', 'color: magenta;', 'testFunction');
  const err = { success: false, message: 'Error', output: null, events: [] };
  try {
    // ...
    return {
      success: true,
      message: 'Success',
      output: null,
      events: [],
    };
  } catch (e) {
    console.log(e);
    return { ...err, message: e.message };
  }
};
