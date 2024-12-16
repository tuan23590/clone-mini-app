import React from 'react'
import Section from '../../components/section'
import ProductGrid from '../../components/product-grid'
import { useProductsStore } from '../../store/productsStore'

export default function FlashSales() {
    const [products,_] = useProductsStore.products()
    
  return (
    <Section title="Flash Sales" viewMoreTo="/flash-sales">
      <ProductGrid products={products} />
    </Section>
  )
}
