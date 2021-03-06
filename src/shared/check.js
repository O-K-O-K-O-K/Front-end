// 이메일 유효성 검사
export const emailCheck = (email) => {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

//  패스워드 검사
export const passwordCheck = (password) => {
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!_])[A-Za-z\d!_]{8,}$/; //  8자 이상 영대소문자, 숫자 조합
  return regExp.test(password);
};

// 견종 문자만 가능하게 제한
export const dogBreedCheck = (dogBreed) => {
  var regExp = /^[가-힣\s]+$/;
  return regExp.test(dogBreed);
};
