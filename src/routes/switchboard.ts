import {
  ServiceResponseWithEvents,
  RequestBody,
  Err,
  ServerFunction,
} from '../config/interfaces';
import { signIn } from '../services/auth-services';
//
//  ###### #    # #    #  ####  ##### #  ####  #    #  ####
//  #      #    # ##   # #    #   #   # #    # ##   # #
//  #####  #    # # #  # #        #   # #    # # #  #  ####
//  #      #    # #  # # #        #   # #    # #  # #      #
//  #      #    # #   ## #    #   #   # #    # #   ## #    #
//  #       ####  #    #  ####    #   #  ####  #    #  ####

export const services = {
  SIGN_IN: signIn as ServerFunction,
};

//
//   ####  #    # # #####  ####  #    # #####   ####    ##   #####  #####
//  #      #    # #   #   #    # #    # #    # #    #  #  #  #    # #    #
//   ####  #    # #   #   #      ###### #####  #    # #    # #    # #    #
//       # # ## # #   #   #      #    # #    # #    # ###### #####  #    #
//  #    # ##  ## #   #   #    # #    # #    # #    # #    # #   #  #    #
//   ####  #    # #   #    ####  #    # #####   ####  #    # #    # #####

// loops through services based on type and calls corresponding function
export const switchboard = async ({
  type,
  input,
}: RequestBody): Promise<ServiceResponseWithEvents> => {
  // incoming
  console.groupCollapsed('%cincoming', 'color: aqua;', type);
  console.log('input', input);
  console.groupEnd();
  const servicesList = Object.entries(services);

  for (let i = 0; i < servicesList.length; i += 1) {
    if (type === servicesList[i][0]) {
      const { success, message, output, events } = await servicesList[i][1](
        input
      );
      if (success) {
        console.groupCollapsed('%cresponse', 'color: lime;', type);
        console.log('success', success);
        console.log('message:', message);
        console.log('output', output);
        console.groupEnd();
        return { success, message, output, events };
      } else {
        console.groupCollapsed('%cresponse', 'color: orange;', type);
        console.log('success', success);
        console.log('message:', message);
        console.log('output', output);
        console.groupEnd();
        return { ...Err, message };
      }
    }
  }
  console.groupCollapsed('%cresponse', 'color: red;', type);
  console.log('success', false);
  console.log('message:', 'Invalid service');
  console.groupEnd();
  return { ...Err, message: 'Invalid service' };
};
