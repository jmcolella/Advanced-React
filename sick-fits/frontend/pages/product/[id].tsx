import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Product } from '../../lib/types';

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
    }
  }
`;

export default function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<
    Product,
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

  return <div>{JSON.stringify(data)}</div>;
}
