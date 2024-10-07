import React, { Suspense } from 'react';

// Lazy load the ProductList component
// React.lazy takes a function that must call import()
// This tells webpack to split this code into a separate bundle
const ProductList = React.lazy(() => import('./ProductList'));

function Products() {
  console.log("this is Lazy Loading");
  
  return (   
    <div>
      <h1>Product Page Title</h1>
      
      {/* 
        Suspense provides a loading fallback while the lazy component loads
        This improves the user experience by showing a loading state
      */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* 
          ProductList is loaded only when this component renders
          This improves initial page load time by reducing the initial bundle size
        */}
        <ProductList />
      </Suspense>
    </div>
  );
}

export default Products;