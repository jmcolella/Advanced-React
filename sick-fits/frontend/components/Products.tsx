import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Product } from '../lib/types';
import ProductComponent from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

export default function Products() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! {error.message} </p>;
  }
  return (
    <ProductList>
      {data.allProducts.map((product: Product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </ProductList>
  );
}
