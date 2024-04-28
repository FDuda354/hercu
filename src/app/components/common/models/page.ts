export interface Page<T> {
  content: T[],
  totalElements: number, // ile jest okólnie elementów na wszystkich stronach
  totalPages: number, // libcza stron dostepnych
  numberOfElements: number, //rozmiar pobranej strony

  number: number, // wybrana aktualna strona //u nas ?page
  size: number, // wybrana ilośc elemnów na stronie u nas ?size

}
