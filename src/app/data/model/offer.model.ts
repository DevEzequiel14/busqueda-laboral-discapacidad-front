export class Offer {
  constructor(
    public title: string = '',
    public date_publication: string = '',
    public location: string = '',
    public description: string = '',
    public tasks: string[] = [],
    public requirements: string[] = [],
    public availability: string = '',
    public company: string = '',
    public modality: string = '',
    public increaseFontSize: string = '',
    public link: string = ''
  ) { }
}
