import { email, max, min, minLength, required, schema } from '@angular/forms/signals';

export interface Subscribe {
  firstName: string;
  lastName: string;
  email: string;
  isEmailRequired: boolean;
  phone: string;
  isPhoneRequired: boolean;
  yearsAsFun: number;
}

export const subscribeFormDefaults: Subscribe = {
  firstName: '',
  lastName: '',
  email: '',
  isEmailRequired: false,
  phone: '',
  isPhoneRequired: false,
  yearsAsFun: NaN,
};

export const subscribeSchema = schema<Subscribe>((path) => {
  required(path.firstName, { message: 'First name field is required' });
  required(path.lastName, { message: 'Last name field is required' });

  required(path.email, {
    when: ({ valueOf }) => valueOf(path.isEmailRequired),
    message: 'Email field is required',
  });
  email(path.email, { message: 'Enter a valid email' });
  minLength(path.email, 6, { message: 'Email must at least be 6 characters' });

  required(path.phone, {
    when: ({ valueOf }) => valueOf(path.isPhoneRequired),
    message: 'Phone field is required',
  });

  min(path.yearsAsFun, 0, { message: 'Years can not be negative' });
  max(path.yearsAsFun, 100, { message: 'Enter valid number of years' });
});
