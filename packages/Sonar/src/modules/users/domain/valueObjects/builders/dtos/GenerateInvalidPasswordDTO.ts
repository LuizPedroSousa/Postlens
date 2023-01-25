export interface GenerateInvalidPasswordDTO {
  length?: number;
  lowerCase?: boolean;
  onlyNumbers?: boolean;
  nonSpecialCharacter?: boolean;
}
