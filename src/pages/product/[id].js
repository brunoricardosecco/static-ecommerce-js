import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

const DetailedProduct = ({ product }) => (
  <div>
    <h1>Produto:</h1>
    <p>{product?.id}</p>
    <p>{product?.name}</p>
    <p>{product?.description}</p>
  </div>
);

export const getStaticProps = async (context) => {
  const { id } = context.params;

  try {
    const response = await fetch(`http://9c58fd54a801.ngrok.io/products/${id}`);
    const parsedResponse = await response.json();

    return {
      props: {
        product: parsedResponse,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        product: {},
      },
      revalidate: 10,
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const response = await fetch(
      'http://9c58fd54a801.ngrok.io/products?_limit=2'
    );
    const parsedResponse = await response.json();
    const paths = parsedResponse.map((product) => ({
      params: {
        id: product.id.toString(),
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default DetailedProduct;
