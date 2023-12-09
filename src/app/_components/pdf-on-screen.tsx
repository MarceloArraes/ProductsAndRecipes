"use client";
import { api } from '~/trpc/react';
import { MyDocument } from './pdf-generator';
import { PDFViewer } from '@react-pdf/renderer';

const PdfOnScreen = () => {
  const { data: products, isLoading } = api.product.getAllProducts.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!products ) {
    return <div>No products found</div>;
  }

  return (
    <PDFViewer>
      <MyDocument products={products} />
    </PDFViewer>
  );
};

export default PdfOnScreen;