export interface SelectOption {
  value: string;
  text: string;
}

export default interface SelectInterface {
  for: string;
  name: string;
  values: SelectOption[];
}