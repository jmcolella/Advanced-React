import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import { Product } from '../../lib/types';

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: center;
  gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<
    { Product: Product },
    { id: string | undefined }
  >(PRODUCT_QUERY, {
    variables: {
      id: typeof id === 'object' ? id[0] : id,
    },
    skip: !id,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {data?.Product.name}</title>
      </Head>
      {data?.Product.photo?.image?.publicUrlTransformed && (
        <img
          src={data?.Product.photo?.image?.publicUrlTransformed}
          alt={data?.Product.photo?.altText || ''}
        />
      )}
      <div className="details">
        <h2>{data?.Product.name}</h2>
        <p>{data?.Product.description}</p>
      </div>
    </ProductStyles>
  );
}
