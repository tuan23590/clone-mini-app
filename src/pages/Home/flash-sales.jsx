import React from 'react'
import Section from '../../components/section'
import ProductGrid from '../../components/product-grid'
import { useStore } from '../../store'

export default function FlashSales() {
    const [products,_] = useStore.products()
  return (
    <Section title="Flash Sales" viewMoreTo="/flash-sales">
      <ProductGrid products={products} />
    </Section>
  )
}
