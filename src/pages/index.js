import Link from 'next/link';

const Home = ({ products }) => (
  <div>
    <main>
      <h1>Lojinha estática</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);

export const getStaticProps = async () => {
  try {
    const response = await fetch('http://9c58fd54a801.ngrok.io/products');
    const parsedResponse = await response.json();
    return {
      props: {
        products: parsedResponse,
      },
      revalidate: 5,
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;
