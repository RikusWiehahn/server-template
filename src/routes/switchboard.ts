import { Request } from 'express';
import { testFunction } from '../services/test-services';

//
//  ###### #    # #    #  ####  ##### #  ####  #    #  ####
//  #      #    # ##   # #    #   #   # #    # ##   # #
//  #####  #    # # #  # #        #   # #    # # #  #  ####
//  #      #    # #  # # #        #   # #    # #  # #      #
//  #      #    # #   ## #    #   #   # #    # #   ## #    #
//  #       ####  #    #  ####    #   #  ####  #    #  ####

export const services = {
  TEST: testFunction,
};

//
//   ####  #    # # #####  ####  #    # #####   ####    ##   #####  #####
//  #      #    # #   #   #    # #    # #    # #    #  #  #  #    # #    #
//   ####  #    # #   #   #      ###### #####  #    # #    # #    # #    #
//       # # ## # #   #   #      #    # #    # #    # ###### #####  #    #
//  #    # ##  ## #   #   #    # #    # #    # #    # #    # #   #  #    #
//   ####  #    # #   #    ####  #    # #####   ####  #    # #    # #####

export interface ServiceResponse {
  success: boolean;
  message: string;
  output: { [key: string]: any } | null;
  events: ServiceResponseEvent[];
}

export interface ServiceResponseEvent {
  id: string;
  message: string;
  output: { [key: string]: any } | null;
}

export interface RequestWithBody extends Request {
  body: { type: string; input: any };
}

export const switchboard = async ({
  type,
  input,
}: {
  type: string;
  input: any;
}): Promise<ServiceResponse> => {
  const err = {
    success: false,
    message: 'Invalid service type',
    output: null,
    events: [],
  };
  // incoming
  console.groupCollapsed('%cIncoming 🛎', 'color: aqua;', type);
  console.log('input', input);
  console.groupEnd();
  const servicesList = Object.entries(services);

  // loop through services and call the right one
  for (let i = 0; i < servicesList.length; i += 1) {
    const serviceType = servicesList[i][0];
    const serviceFunction = servicesList[i][1];

    if (type === serviceType) {
      const { success, message, output, events } = await serviceFunction(input);
      if (success) {
        console.groupCollapsed('%cResponse 🎁', 'color: lime;', type);
        console.log('success', success);
        console.log('message:', message);
        console.log('output', output);
        console.log('events', events);
        console.groupEnd();
        return {
          success,
          message,
          output,
          events,
        };
      } else {
        console.groupCollapsed('%cResponse 🧨', 'color: orange;', type);
        console.log('success', success);
        console.log('message:', message);
        console.log('output', output);
        console.log('events', events);
        console.groupEnd();
        return { ...err, message };
      }
    }
  }
  console.groupCollapsed('%cResponse 💀', 'color: red;', type);
  console.log('success', false);
  console.log('message:', 'Invalid service');
  console.groupEnd();
  return { ...err, message: 'Invalid service' };
};
