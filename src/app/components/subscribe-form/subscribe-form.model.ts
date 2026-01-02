import {
  applyWhen,
  customError,
  email,
  max,
  min,
  minLength,
  required,
  schema,
  validateTree,
} from '@angular/forms/signals';

const EMAIL = {
  MIN: 6,
};

const PHONE = {
  MIN: 10,
};

const YEARS_AS_FUN = {
  MIN: 0,
  MAX: 100,
};

export interface Subscribe {
  firstName: string;
  lastName: string;
  email: string;
  isEmailRequired: boolean;
  phone: string;
  isPhoneRequired: boolean;
  yearsAsFun: number;
}

export const initialFormData: Subscribe = {
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
  minLength(path.email, EMAIL.MIN, { message: `Email must at least be ${EMAIL.MIN} characters` });

  // Использовали applyWhen потому, что схема валидации содержит несколько правил
  applyWhen(
    path.phone,
    ({ valueOf }) => valueOf(path.isPhoneRequired),
    (pathPhone) => {
      required(pathPhone, { message: 'Phone field is required' });
      minLength(pathPhone, PHONE.MIN, {
        message: `Email must at least be ${PHONE.MIN} characters`,
      });
    },
  );

  // Применяем validateTree, когда нужно проверять состояние нескольких контролов одновременно и сразу
  // можем применять разные правила валидации к разным контролам
  validateTree(path, ({ valueOf, fieldTreeOf }) => {
    const isEmailRequiredValue = valueOf(path.isEmailRequired);
    const isPhoneRequiredValue = valueOf(path.isPhoneRequired);

    if (isEmailRequiredValue || isPhoneRequiredValue) {
      return null;
    }

    return [
      customError({
        fieldTree: fieldTreeOf(path.isEmailRequired),
        kind: 'sendViaMissing',
        message: 'Must select Email or Phone or both fields to send',
      }),
      customError({
        fieldTree: fieldTreeOf(path.isPhoneRequired),
        kind: 'sendViaMissing',
        message: 'Must select Email or Phone or both fields to send',
      }),
    ];
  });

  min(path.yearsAsFun, YEARS_AS_FUN.MIN, { message: 'Years can not be negative' });
  max(path.yearsAsFun, YEARS_AS_FUN.MAX, { message: 'Enter valid number of years' });
});
