import { gql } from '@apollo/client';

// Alias the response for clarity
export const GET_PROJECTS_QUERY = gql`
   query($id: String!) {
      Project(_id: $id) {
         _id
         name
         categories(orderBy: order_asc) {
            _id
            title
            order
            titleBackgroundColor
            backgroundColor
            titleColor
            items(orderBy: order_asc) {
               _id
               order
               summary
               description
            }
         }
      }
   }
`;

export const UPDATE_CATEGORY = gql`
   mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput) {
      UpdateCategory(id: $id, input: $input) {
         _id
         title
         backgroundColor
         titleBackgroundColor
         order
      }
   }
`;

export const UPDATE_ITEM = gql`
   mutation UpdateItem($id: ID!, $input: UpdateItemInput) {
      UpdateItem(id: $id, input: $input) {
         _id
         summary
         description
         order
      }
   }
`;

export const CREATE_ITEM = gql`
   mutation CreateItem($categoryId: ID!, $input: UpdateItemInput) {
      CreateItem(categoryId: $categoryId, input: $input) {
         _id
         summary
         description
         order
      }
   }
`;

export const ITEMS_BY_CATEGORY = gql`
   query Category($id: String!) {
      Category(_id: $id) {
         _id
         title
         items(orderBy: order_asc) {
            _id
            summary
            description
            order
         }
      }
   }
`;
