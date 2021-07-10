import { gql, useMutation, useQuery } from '@apollo/client';
import { Product } from '../lib/types';

const SINGLE_PRODUCT_QUERY = gql`
  query singleProduct($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      status
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($id: ID!, $data: ProductUpdateInput) {
    updateProduct(id: $id, data: $data) {
      id
      name
      description
      status
      price
    }
  }
`;

interface Props {
  id: string | string[] | undefined;
}
export default function UpdateProduct(props: Props) {
  const { id } = props;

  const { data, loading, error } = useQuery<{ Product: Product }>(
    SINGLE_PRODUCT_QUERY,
    {
      variables: {
        id,
      },
      skip: !id,
    }
  );

  const [updateProduct, { data: updateData }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );

  console.log(data);

  return <div>Update! {id}</div>;
}
