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
  const response = await fetch('https://continuelab.com.br/ws-store/products');
  const parsedResponse = await response.json();
  return {
    props: {
      products: parsedResponse,
    },
    revalidate: 5,
  };
};

export default Home;
