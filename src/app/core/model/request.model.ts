import { GenericOptions } from './options.model';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface GenericRequest {
  method: RequestMethod;
  url: string;
  options?: GenericOptions;
}
