import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
