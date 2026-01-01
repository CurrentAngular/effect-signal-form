import { email, max, min, minLength, required, REQUIRED, schema } from '@angular/forms/signals';

export interface Subscribe {
  firstName: string;
  lastName: string;
  email: string;
  yearsAsFun: number;
}

export const initialSubscribeForm: Subscribe = {
  firstName: '',
  lastName: '',
  email: '',
  yearsAsFun: NaN,
};

export const subscribeSchema = schema<Subscribe>((path) => {
  required(path.firstName, { message: 'First name field is required' });
  required(path.lastName, { message: 'Last name field is required' });

  required(path.email, { message: 'Email name field is required' });
  email(path.email, { message: 'Enter a valid email' });
  minLength(path.email, 6, { message: 'Email must at least be 6 characters' });

  min(path.yearsAsFun, 0, { message: 'Years can not be negative' });
  max(path.yearsAsFun, 100, { message: 'Enter valid number of years' });
});
