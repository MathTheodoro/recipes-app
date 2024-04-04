export type TitleProps = {
  title: string
  showSearchButton?: boolean
};

export type SearchType = {
  searchedtext: string,
  searchtype: string,
};

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
export type SubmitEvent = React.FormEvent<HTMLFormElement>;