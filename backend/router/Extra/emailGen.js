exports.generateOTP = () => {
  let OTP = "";
  for (let i = 0; i <= 3; i++) {
    let random = Math.round(Math.random() * 9);
    OTP += random;
  }
  return OTP;
};
