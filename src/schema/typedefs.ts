import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
   query {
      Project {
         _id
         name
         description
      }
   }
`;

export const GET_PROJECT = gql`
   query($id: String!) {
      Project(_id: $id) {
         _id
         categories(orderBy: order_asc) {
            _id
            title
            order
            titleBackgroundColor
            backgroundColor
            titleColor
         }
      }
   }
`;

export const GET_CATEGORY_ITEMS = gql`
   query Category($id: String!) {
      Category(_id: $id) {
         _id
         items(orderBy: order_asc) {
            _id
            order
            summary
            description
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

export const DELETE_ITEM = gql`
   mutation DeleteItem($id: ID!) {
      DeleteItem(id: $id) {
         _id
      }
   }
`;

export const REMOVE_ITEM_CATEGORY = gql`
   mutation RemoveItemCategory($from: _ItemInput!, $to: _CategoryInput!) {
      RemoveItemCategory(from: $from, to: $to) {
         from {
            _id
         }
         to {
            _id
         }
      }
   }
`;
