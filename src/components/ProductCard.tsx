import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import { ReactNode } from "react";

const ProductCard = ({
  product,
}: {
  product: {
    creator: ReactNode;
    id: number;
    name: string;
    image: string;
    price: number;
  };
}) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            className={styles.productImage}
            width={200}
            height={200}
          />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.creator}>{product.creator}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
