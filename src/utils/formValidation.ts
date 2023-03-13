export const checkEmailValid = (value: string): boolean => {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
};

export const checkPasswordValid = (value: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
};
