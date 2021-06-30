import { useRouter } from 'next/router'
import SingleProduct from '../../components/SingleProduct'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query

  return <SingleProduct productId={id} />
}
