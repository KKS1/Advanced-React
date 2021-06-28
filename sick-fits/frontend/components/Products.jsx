import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const ALL_PRODUCTS_QUERY = gql`
  # Write your query or mutation here
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, [col-start] 1fr);
  grid-gap: 60px;
`;

export default function Products() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </ProductsListStyles>
    </div>
  );
}
