import Link from 'next/link';
import { Product } from '../lib/types';
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

interface Props {
  product: Product;
}
export default function ProductComponent({ product }: Props) {
  return (
    <Item>
      {product.photo?.image?.publicUrlTransformed ? (
        <img
          src={product.photo.image.publicUrlTransformed}
          alt={product.name || ''}
        />
      ) : null}

      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>

      {product.price && <PriceTag>{formatMoney(product.price)}</PriceTag>}

      {product.description && <p>{product.description}</p>}

      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
      </div>
    </Item>
  );
}
