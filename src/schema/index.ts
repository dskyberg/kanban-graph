export interface SchemaElement {
   _id?: number;
}
export interface Item extends SchemaElement {
   summary: string;
   description?: string;
   order?: number;
}
export interface Category extends SchemaElement {
   title: string;
   backgroundColor: string;
   titleBackgroundColor: string;
   order?: number;
   items?: Item[];
}

export interface Project extends SchemaElement {
   name: string;
   description?: string;
   categories?: Category[];
}

export * from './typedefs';
