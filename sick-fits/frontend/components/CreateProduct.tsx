import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

import { Product, ProductCreateInput } from '../lib/types';

interface FormState {
  name: string;
  price: number;
  image: File | null;
  description: string;
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT($data: ProductCreateInput) {
    createProduct(data: $data) {
      id
      name
      price
      description
      photo {
        id
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function CreateProduct() {
  const [mutate, { loading, error }] = useMutation<
    { createProduct: Product },
    { data: ProductCreateInput }
  >(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });
  const { inputs, handleChange, clearForm } = useForm<FormState>({
    name: 'yo',
    price: 333,
    image: null,
    description: '',
  });

  const handleOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const res = await mutate({
      variables: {
        data: {
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
          status: 'AVAILABLE',
          photo: {
            create: {
              image: inputs.image,
              altText: inputs.name,
            },
          },
        },
      },
    });

    clearForm();

    Router.push(`product/${res.data?.createProduct?.id}`);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit">Add Product</button>
    </Form>
  );
}
